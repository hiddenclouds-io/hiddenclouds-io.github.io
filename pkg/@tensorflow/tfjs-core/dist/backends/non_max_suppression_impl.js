/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { binaryInsert } from './non_max_suppression_util';
export function nonMaxSuppressionV3Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, 0 /* softNmsSigma */);
}
export function nonMaxSuppressionV4Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize) {
    return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, 0 /* softNmsSigma */, false /* returnScoresTensor */, padToMaxOutputSize /* padToMaxOutputSize */, true
    /* returnValidOutputs */ );
}
export function nonMaxSuppressionV5Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
    return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, true /* returnScoresTensor */);
}
function nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, returnScoresTensor = false, padToMaxOutputSize = false, returnValidOutputs = false) {
    // The list is sorted in ascending order, so that we can always pop the
    // candidate with the largest score in O(1) time.
    const candidates = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > scoreThreshold) {
            candidates.push({ score: scores[i], boxIndex: i, suppressBeginIndex: 0 });
        }
    }
    candidates.sort(ascendingComparator);
    // If softNmsSigma is 0, the outcome of this algorithm is exactly same as
    // before.
    const scale = softNmsSigma > 0 ? (-0.5 / softNmsSigma) : 0.0;
    const selectedIndices = [];
    const selectedScores = [];
    while (selectedIndices.length < maxOutputSize && candidates.length > 0) {
        const candidate = candidates.pop();
        const { score: originalScore, boxIndex, suppressBeginIndex } = candidate;
        if (originalScore < scoreThreshold) {
            break;
        }
        // Overlapping boxes are likely to have similar scores, therefore we
        // iterate through the previously selected boxes backwards in order to
        // see if candidate's score should be suppressed. We use
        // suppressBeginIndex to track and ensure a candidate can be suppressed
        // by a selected box no more than once. Also, if the overlap exceeds
        // iouThreshold, we simply ignore the candidate.
        let ignoreCandidate = false;
        for (let j = selectedIndices.length - 1; j >= suppressBeginIndex; --j) {
            const iou = intersectionOverUnion(boxes, boxIndex, selectedIndices[j]);
            if (iou >= iouThreshold) {
                ignoreCandidate = true;
                break;
            }
            candidate.score =
                candidate.score * suppressWeight(iouThreshold, scale, iou);
            if (candidate.score <= scoreThreshold) {
                break;
            }
        }
        // At this point, if `candidate.score` has not dropped below
        // `scoreThreshold`, then we know that we went through all of the
        // previous selections and can safely update `suppressBeginIndex` to the
        // end of the selected array. Then we can re-insert the candidate with
        // the updated score and suppressBeginIndex back in the candidate list.
        // If on the other hand, `candidate.score` has dropped below the score
        // threshold, we will not add it back to the candidates list.
        candidate.suppressBeginIndex = selectedIndices.length;
        if (!ignoreCandidate) {
            // Candidate has passed all the tests, and is not suppressed, so
            // select the candidate.
            if (candidate.score === originalScore) {
                selectedIndices.push(boxIndex);
                selectedScores.push(candidate.score);
            }
            else if (candidate.score > scoreThreshold) {
                // Candidate's score is suppressed but is still high enough to be
                // considered, so add back to the candidates list.
                binaryInsert(candidates, candidate, ascendingComparator);
            }
        }
    }
    // NonMaxSuppressionV4 feature: padding output to maxOutputSize.
    const validOutputs = selectedIndices.length;
    const elemsToPad = maxOutputSize - validOutputs;
    if (padToMaxOutputSize && elemsToPad > 0) {
        selectedIndices.push(...new Array(elemsToPad).fill(0));
        selectedScores.push(...new Array(elemsToPad).fill(0.0));
    }
    const result = { selectedIndices };
    if (returnScoresTensor) {
        result['selectedScores'] = selectedScores;
    }
    if (returnValidOutputs) {
        result['validOutputs'] = validOutputs;
    }
    return result;
}
function intersectionOverUnion(boxes, i, j) {
    const iCoord = boxes.subarray(i * 4, i * 4 + 4);
    const jCoord = boxes.subarray(j * 4, j * 4 + 4);
    const yminI = Math.min(iCoord[0], iCoord[2]);
    const xminI = Math.min(iCoord[1], iCoord[3]);
    const ymaxI = Math.max(iCoord[0], iCoord[2]);
    const xmaxI = Math.max(iCoord[1], iCoord[3]);
    const yminJ = Math.min(jCoord[0], jCoord[2]);
    const xminJ = Math.min(jCoord[1], jCoord[3]);
    const ymaxJ = Math.max(jCoord[0], jCoord[2]);
    const xmaxJ = Math.max(jCoord[1], jCoord[3]);
    const areaI = (ymaxI - yminI) * (xmaxI - xminI);
    const areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
    if (areaI <= 0 || areaJ <= 0) {
        return 0.0;
    }
    const intersectionYmin = Math.max(yminI, yminJ);
    const intersectionXmin = Math.max(xminI, xminJ);
    const intersectionYmax = Math.min(ymaxI, ymaxJ);
    const intersectionXmax = Math.min(xmaxI, xmaxJ);
    const intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0.0) *
        Math.max(intersectionXmax - intersectionXmin, 0.0);
    return intersectionArea / (areaI + areaJ - intersectionArea);
}
// A Gaussian penalty function, this method always returns values in [0, 1].
// The weight is a function of similarity, the more overlap two boxes are, the
// smaller the weight is,meaning highly overlapping boxes will be significantly
// penalized. On the other hand, a non-overlapping box will not be penalized.
function suppressWeight(iouThreshold, scale, iou) {
    const weight = Math.exp(scale * iou * iou);
    return iou <= iouThreshold ? weight : 0.0;
}
function ascendingComparator(c1, c2) {
    // For objects with same scores, we make the object with the larger index go
    // first. In an array that pops from the end, this means that the object with
    // the smaller index will be popped first. This ensures the same output as
    // the TensorFlow python version.
    return (c1.score - c2.score) ||
        ((c1.score === c2.score) && (c2.boxIndex - c1.boxIndex));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9uX21heF9zdXBwcmVzc2lvbl9pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1jb3JlL3NyYy9iYWNrZW5kcy9ub25fbWF4X3N1cHByZXNzaW9uX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBR0gsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBaUJ4RCxNQUFNLFVBQVUsdUJBQXVCLENBQ25DLEtBQWlCLEVBQUUsTUFBa0IsRUFBRSxhQUFxQixFQUM1RCxZQUFvQixFQUFFLGNBQXNCO0lBQzlDLE9BQU8sc0JBQXNCLENBQ3pCLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQzFELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBQ25DLEtBQWlCLEVBQUUsTUFBa0IsRUFBRSxhQUFxQixFQUM1RCxZQUFvQixFQUFFLGNBQXNCLEVBQzVDLGtCQUEyQjtJQUM3QixPQUFPLHNCQUFzQixDQUN6QixLQUFLLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUMxRCxDQUFDLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLHdCQUF3QixFQUNwRCxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJO0lBQ2pELHdCQUF3QixFQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELE1BQU0sVUFBVSx1QkFBdUIsQ0FDbkMsS0FBaUIsRUFBRSxNQUFrQixFQUFFLGFBQXFCLEVBQzVELFlBQW9CLEVBQUUsY0FBc0IsRUFDNUMsWUFBb0I7SUFDdEIsT0FBTyxzQkFBc0IsQ0FDekIsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQ3hFLElBQUksQ0FBQyx3QkFBd0Is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QUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDaEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDaEQsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDNUIsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixFQUFFLEdBQUcsQ0FBQztRQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLGdCQUFnQixDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELDRFQUE0RTtBQUM1RSw4RUFBOEU7QUFDOUUsK0VBQStFO0FBQy9FLDZFQUE2RTtBQUM3RSxTQUFTLGNBQWMsQ0FBQyxZQUFvQixFQUFFLEtBQWEsRUFBRSxHQUFXO0lBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzQyxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQzVDLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLEVBQWEsRUFBRSxFQUFhO0lBQ3ZELDRFQUE0RTtJQUM1RSw2RUFBNkU7SUFDN0UsMEVBQTBFO0lBQzFFLGlDQUFpQztJQUNqQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtUeXBlZEFycmF5fSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge2JpbmFyeUluc2VydH0gZnJvbSAnLi9ub25fbWF4X3N1cHByZXNzaW9uX3V0aWwnO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBOb25NYXhTdXBwcmVzc2lvbiBrZXJuZWwgc2hhcmVkIGJldHdlZW4gd2ViZ2wgYW5kIGNwdS5cbiAqL1xuaW50ZXJmYWNlIENhbmRpZGF0ZSB7XG4gIHNjb3JlOiBudW1iZXI7XG4gIGJveEluZGV4OiBudW1iZXI7XG4gIHN1cHByZXNzQmVnaW5JbmRleDogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTm9uTWF4U3VwcHJlc3Npb25SZXN1bHQge1xuICBzZWxlY3RlZEluZGljZXM6IG51bWJlcltdO1xuICBzZWxlY3RlZFNjb3Jlcz86IG51bWJlcltdO1xuICB2YWxpZE91dHB1dHM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub25NYXhTdXBwcmVzc2lvblYzSW1wbChcbiAgICBib3hlczogVHlwZWRBcnJheSwgc2NvcmVzOiBUeXBlZEFycmF5LCBtYXhPdXRwdXRTaXplOiBudW1iZXIsXG4gICAgaW91VGhyZXNob2xkOiBudW1iZXIsIHNjb3JlVGhyZXNob2xkOiBudW1iZXIpOiBOb25NYXhTdXBwcmVzc2lvblJlc3VsdCB7XG4gIHJldHVybiBub25NYXhTdXBwcmVzc2lvbkltcGxfKFxuICAgICAgYm94ZXMsIHNjb3JlcywgbWF4T3V0cHV0U2l6ZSwgaW91VGhyZXNob2xkLCBzY29yZVRocmVzaG9sZCxcbiAgICAgIDAgLyogc29mdE5tc1NpZ21hICovKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vbk1heFN1cHByZXNzaW9uVjRJbXBsKFxuICAgIGJveGVzOiBUeXBlZEFycmF5LCBzY29yZXM6IFR5cGVkQXJyYXksIG1heE91dHB1dFNpemU6IG51bWJlcixcbiAgICBpb3VUaHJlc2hvbGQ6IG51bWJlciwgc2NvcmVUaHJlc2hvbGQ6IG51bWJlcixcbiAgICBwYWRUb01heE91dHB1dFNpemU6IGJvb2xlYW4pOiBOb25NYXhTdXBwcmVzc2lvblJlc3VsdCB7XG4gIHJldHVybiBub25NYXhTdXBwcmVzc2lvbkltcGxfKFxuICAgICAgYm94ZXMsIHNjb3JlcywgbWF4T3V0cHV0U2l6ZSwgaW91VGhyZXNob2xkLCBzY29yZVRocmVzaG9sZCxcbiAgICAgIDAgLyogc29mdE5tc1NpZ21hICovLCBmYWxzZSAvKiByZXR1cm5TY29yZXNUZW5zb3IgKi8sXG4gICAgICBwYWRUb01heE91dHB1dFNpemUgLyogcGFkVG9NYXhPdXRwdXRTaXplICovLCB0cnVlXG4gICAgICAvKiByZXR1cm5WYWxpZE91dHB1dHMgKi8pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9uTWF4U3VwcHJlc3Npb25WNUltcGwoXG4gICAgYm94ZXM6IFR5cGVkQXJyYXksIHNjb3JlczogVHlwZWRBcnJheSwgbWF4T3V0cHV0U2l6ZTogbnVtYmVyLFxuICAgIGlvdVRocmVzaG9sZDogbnVtYmVyLCBzY29yZVRocmVzaG9sZDogbnVtYmVyLFxuICAgIHNvZnRObXNTaWdtYTogbnVtYmVyKTogTm9uTWF4U3VwcHJlc3Npb25SZXN1bHQge1xuICByZXR1cm4gbm9uTWF4U3VwcHJlc3Npb25JbXBsXyhcbiAgICAgIGJveGVzLCBzY29yZXMsIG1heE91dHB1dFNpemUsIGlvdVRocmVzaG9sZCwgc2NvcmVUaHJlc2hvbGQsIHNvZnRObXNTaWdtYSxcbiAgICAgIHRydWUgLyogcmV0dXJuU2NvcmVzVGVuc29yICovKTtcbn1cblxuZnVuY3Rpb24gbm9uTWF4U3VwcHJlc3Npb25JbXBsXyhcbiAgICBib3hlczogVHlwZWRBcnJheSwgc2NvcmVzOiBUeXBlZEFycmF5LCBtYXhPdXRwdXRTaXplOiBudW1iZXIsXG4gICAgaW91VGhyZXNob2xkOiBudW1iZXIsIHNjb3JlVGhyZXNob2xkOiBudW1iZXIsIHNvZnRObXNTaWdtYTogbnVtYmVyLFxuICAgIHJldHVyblNjb3Jlc1RlbnNvciA9IGZhbHNlLCBwYWRUb01heE91dHB1dFNpemUgPSBmYWxzZSxcbiAgICByZXR1cm5WYWxpZE91dHB1dHMgPSBmYWxzZSk6IE5vbk1heFN1cHByZXNzaW9uUmVzdWx0IHtcbiAgLy8gVGhlIGxpc3QgaXMgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlciwgc28gdGhhdCB3ZSBjYW4gYWx3YXlzIHBvcCB0aGVcbiAgLy8gY2FuZGlkYXRlIHdpdGggdGhlIGxhcmdlc3Qgc2NvcmUgaW4gTygxKSB0aW1lLlxuICBjb25zdCBjYW5kaWRhdGVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc2NvcmVzW2ldID4gc2NvcmVUaHJlc2hvbGQpIHtcbiAgICAgIGNhbmRpZGF0ZXMucHVzaCh7c2NvcmU6IHNjb3Jlc1tpXSwgYm94SW5kZXg6IGksIHN1cHByZXNzQmVnaW5JbmRleDogMH0pO1xuICAgIH1cbiAgfVxuXG4gIGNhbmRpZGF0ZXMuc29ydChhc2NlbmRpbmdDb21wYXJhdG9yKTtcblxuICAvLyBJZiBzb2Z0Tm1zU2lnbWEgaXMgMCwgdGhlIG91dGNvbWUgb2YgdGhpcyBhbGdvcml0aG0gaXMgZXhhY3RseSBzYW1lIGFzXG4gIC8vIGJlZm9yZS5cbiAgY29uc3Qgc2NhbGUgPSBzb2Z0Tm1zU2lnbWEgPiAwID8gKC0wLjUgLyBzb2Z0Tm1zU2lnbWEpIDogMC4wO1xuXG4gIGNvbnN0IHNlbGVjdGVkSW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3Qgc2VsZWN0ZWRTY29yZXM6IG51bWJlcltdID0gW107XG5cbiAgd2hpbGUgKHNlbGVjdGVkSW5kaWNlcy5sZW5ndGggPCBtYXhPdXRwdXRTaXplICYmIGNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZXMucG9wKCk7XG4gICAgY29uc3Qge3Njb3JlOiBvcmlnaW5hbFNjb3JlLCBib3hJbmRleCwgc3VwcHJlc3NCZWdpbkluZGV4fSA9IGNhbmRpZGF0ZTtcblxuICAgIGlmIChvcmlnaW5hbFNjb3JlIDwgc2NvcmVUaHJlc2hvbGQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIE92ZXJsYXBwaW5nIGJveGVzIGFyZSBsaWtlbHkgdG8gaGF2ZSBzaW1pbGFyIHNjb3JlcywgdGhlcmVmb3JlIHdlXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIHRoZSBwcmV2aW91c2x5IHNlbGVjdGVkIGJveGVzIGJhY2t3YXJkcyBpbiBvcmRlciB0b1xuICAgIC8vIHNlZSBpZiBjYW5kaWRhdGUncyBzY29yZSBzaG91bGQgYmUgc3VwcHJlc3NlZC4gV2UgdXNlXG4gICAgLy8gc3VwcHJlc3NCZWdpbkluZGV4IHRvIHRyYWNrIGFuZCBlbnN1cmUgYSBjYW5kaWRhdGUgY2FuIGJlIHN1cHByZXNzZWRcbiAgICAvLyBieSBhIHNlbGVjdGVkIGJveCBubyBtb3JlIHRoYW4gb25jZS4gQWxzbywgaWYgdGhlIG92ZXJsYXAgZXhjZWVkc1xuICAgIC8vIGlvdVRocmVzaG9sZCwgd2Ugc2ltcGx5IGlnbm9yZSB0aGUgY2FuZGlkYXRlLlxuICAgIGxldCBpZ25vcmVDYW5kaWRhdGUgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBqID0gc2VsZWN0ZWRJbmRpY2VzLmxlbmd0aCAtIDE7IGogPj0gc3VwcHJlc3NCZWdpbkluZGV4OyAtLWopIHtcbiAgICAgIGNvbnN0IGlvdSA9IGludGVyc2VjdGlvbk92ZXJVbmlvbihib3hlcywgYm94SW5kZXgsIHNlbGVjdGVkSW5kaWNlc1tqXSk7XG5cbiAgICAgIGlmIChpb3UgPj0gaW91VGhyZXNob2xkKSB7XG4gICAgICAgIGlnbm9yZUNhbmRpZGF0ZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYW5kaWRhdGUuc2NvcmUgPVxuICAgICAgICAgIGNhbmRpZGF0ZS5zY29yZSAqIHN1cHByZXNzV2VpZ2h0KGlvdVRocmVzaG9sZCwgc2NhbGUsIGlvdSk7XG5cbiAgICAgIGlmIChjYW5kaWRhdGUuc2NvcmUgPD0gc2NvcmVUaHJlc2hvbGQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgaWYgYGNhbmRpZGF0ZS5zY29yZWAgaGFzIG5vdCBkcm9wcGVkIGJlbG93XG4gICAgLy8gYHNjb3JlVGhyZXNob2xkYCwgdGhlbiB3ZSBrbm93IHRoYXQgd2Ugd2VudCB0aHJvdWdoIGFsbCBvZiB0aGVcbiAgICAvLyBwcmV2aW91cyBzZWxlY3Rpb25zIGFuZCBjYW4gc2FmZWx5IHVwZGF0ZSBgc3VwcHJlc3NCZWdpbkluZGV4YCB0byB0aGVcbiAgICAvLyBlbmQgb2YgdGhlIHNlbGVjdGVkIGFycmF5LiBUaGVuIHdlIGNhbiByZS1pbnNlcnQgdGhlIGNhbmRpZGF0ZSB3aXRoXG4gICAgLy8gdGhlIHVwZGF0ZWQgc2NvcmUgYW5kIHN1cHByZXNzQmVnaW5JbmRleCBiYWNrIGluIHRoZSBjYW5kaWRhdGUgbGlzdC5cbiAgICAvLyBJZiBvbiB0aGUgb3RoZXIgaGFuZCwgYGNhbmRpZGF0ZS5zY29yZWAgaGFzIGRyb3BwZWQgYmVsb3cgdGhlIHNjb3JlXG4gICAgLy8gdGhyZXNob2xkLCB3ZSB3aWxsIG5vdCBhZGQgaXQgYmFjayB0byB0aGUgY2FuZGlkYXRlcyBsaXN0LlxuICAgIGNhbmRpZGF0ZS5zdXBwcmVzc0JlZ2luSW5kZXggPSBzZWxlY3RlZEluZGljZXMubGVuZ3RoO1xuXG4gICAgaWYgKCFpZ25vcmVDYW5kaWRhdGUpIHtcbiAgICAgIC8vIENhbmRpZGF0ZSBoYXMgcGFzc2VkIGFsbCB0aGUgdGVzdHMsIGFuZCBpcyBub3Qgc3VwcHJlc3NlZCwgc29cbiAgICAgIC8vIHNlbGVjdCB0aGUgY2FuZGlkYXRlLlxuICAgICAgaWYgKGNhbmRpZGF0ZS5zY29yZSA9PT0gb3JpZ2luYWxTY29yZSkge1xuICAgICAgICBzZWxlY3RlZEluZGljZXMucHVzaChib3hJbmRleCk7XG4gICAgICAgIHNlbGVjdGVkU2NvcmVzLnB1c2goY2FuZGlkYXRlLnNjb3JlKTtcbiAgICAgIH0gZWxzZSBpZiAoY2FuZGlkYXRlLnNjb3JlID4gc2NvcmVUaHJlc2hvbGQpIHtcbiAgICAgICAgLy8gQ2FuZGlkYXRlJ3Mgc2NvcmUgaXMgc3VwcHJlc3NlZCBidXQgaXMgc3RpbGwgaGlnaCBlbm91Z2ggdG8gYmVcbiAgICAgICAgLy8gY29uc2lkZXJlZCwgc28gYWRkIGJhY2sgdG8gdGhlIGNhbmRpZGF0ZXMgbGlzdC5cbiAgICAgICAgYmluYXJ5SW5zZXJ0KGNhbmRpZGF0ZXMsIGNhbmRpZGF0ZSwgYXNjZW5kaW5nQ29tcGFyYXRvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTm9uTWF4U3VwcHJlc3Npb25WNCBmZWF0dXJlOiBwYWRkaW5nIG91dHB1dCB0byBtYXhPdXRwdXRTaXplLlxuICBjb25zdCB2YWxpZE91dHB1dHMgPSBzZWxlY3RlZEluZGljZXMubGVuZ3RoO1xuICBjb25zdCBlbGVtc1RvUGFkID0gbWF4T3V0cHV0U2l6ZSAtIHZhbGlkT3V0cHV0cztcblxuICBpZiAocGFkVG9NYXhPdXRwdXRTaXplICYmIGVsZW1zVG9QYWQgPiAwKSB7XG4gICAgc2VsZWN0ZWRJbmRpY2VzLnB1c2goLi4ubmV3IEFycmF5KGVsZW1zVG9QYWQpLmZpbGwoMCkpO1xuICAgIHNlbGVjdGVkU2NvcmVzLnB1c2goLi4ubmV3IEFycmF5KGVsZW1zVG9QYWQpLmZpbGwoMC4wKSk7XG4gIH1cblxuICBjb25zdCByZXN1bHQ6IE5vbk1heFN1cHByZXNzaW9uUmVzdWx0ID0ge3NlbGVjdGVkSW5kaWNlc307XG5cbiAgaWYgKHJldHVyblNjb3Jlc1RlbnNvcikge1xuICAgIHJlc3VsdFsnc2VsZWN0ZWRTY29yZXMnXSA9IHNlbGVjdGVkU2NvcmVzO1xuICB9XG5cbiAgaWYgKHJldHVyblZhbGlkT3V0cHV0cykge1xuICAgIHJlc3VsdFsndmFsaWRPdXRwdXRzJ10gPSB2YWxpZE91dHB1dHM7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpbnRlcnNlY3Rpb25PdmVyVW5pb24oYm94ZXM6IFR5cGVkQXJyYXksIGk6IG51bWJlciwgajogbnVtYmVyKSB7XG4gIGNvbnN0IGlDb29yZCA9IGJveGVzLnN1YmFycmF5KGkgKiA0LCBpICogNCArIDQpO1xuICBjb25zdCBqQ29vcmQgPSBib3hlcy5zdWJhcnJheShqICogNCwgaiAqIDQgKyA0KTtcbiAgY29uc3QgeW1pbkkgPSBNYXRoLm1pbihpQ29vcmRbMF0sIGlDb29yZFsyXSk7XG4gIGNvbnN0IHhtaW5JID0gTWF0aC5taW4oaUNvb3JkWzFdLCBpQ29vcmRbM10pO1xuICBjb25zdCB5bWF4SSA9IE1hdGgubWF4KGlDb29yZFswXSwgaUNvb3JkWzJdKTtcbiAgY29uc3QgeG1heEkgPSBNYXRoLm1heChpQ29vcmRbMV0sIGlDb29yZFszXSk7XG4gIGNvbnN0IHltaW5KID0gTWF0aC5taW4oakNvb3JkWzBdLCBqQ29vcmRbMl0pO1xuICBjb25zdCB4bWluSiA9IE1hdGgubWluKGpDb29yZFsxXSwgakNvb3JkWzNdKTtcbiAgY29uc3QgeW1heEogPSBNYXRoLm1heChqQ29vcmRbMF0sIGpDb29yZFsyXSk7XG4gIGNvbnN0IHhtYXhKID0gTWF0aC5tYXgoakNvb3JkWzFdLCBqQ29vcmRbM10pO1xuICBjb25zdCBhcmVhSSA9ICh5bWF4SSAtIHltaW5JKSAqICh4bWF4SSAtIHhtaW5JKTtcbiAgY29uc3QgYXJlYUogPSAoeW1heEogLSB5bWluSikgKiAoeG1heEogLSB4bWluSik7XG4gIGlmIChhcmVhSSA8PSAwIHx8IGFyZWFKIDw9IDApIHtcbiAgICByZXR1cm4gMC4wO1xuICB9XG4gIGNvbnN0IGludGVyc2VjdGlvblltaW4gPSBNYXRoLm1heCh5bWluSSwgeW1pbkopO1xuICBjb25zdCBpbnRlcnNlY3Rpb25YbWluID0gTWF0aC5tYXgoeG1pbkksIHhtaW5KKTtcbiAgY29uc3QgaW50ZXJzZWN0aW9uWW1heCA9IE1hdGgubWluKHltYXhJLCB5bWF4Sik7XG4gIGNvbnN0IGludGVyc2VjdGlvblhtYXggPSBNYXRoLm1pbih4bWF4SSwgeG1heEopO1xuICBjb25zdCBpbnRlcnNlY3Rpb25BcmVhID0gTWF0aC5tYXgoaW50ZXJzZWN0aW9uWW1heCAtIGludGVyc2VjdGlvblltaW4sIDAuMCkgKlxuICAgICAgTWF0aC5tYXgoaW50ZXJzZWN0aW9uWG1heCAtIGludGVyc2VjdGlvblhtaW4sIDAuMCk7XG4gIHJldHVybiBpbnRlcnNlY3Rpb25BcmVhIC8gKGFyZWFJICsgYXJlYUogLSBpbnRlcnNlY3Rpb25BcmVhKTtcbn1cblxuLy8gQSBHYXVzc2lhbiBwZW5hbHR5IGZ1bmN0aW9uLCB0aGlzIG1ldGhvZCBhbHdheXMgcmV0dXJucyB2YWx1ZXMgaW4gWzAsIDFdLlxuLy8gVGhlIHdlaWdodCBpcyBhIGZ1bmN0aW9uIG9mIHNpbWlsYXJpdHksIHRoZSBtb3JlIG92ZXJsYXAgdHdvIGJveGVzIGFyZSwgdGhlXG4vLyBzbWFsbGVyIHRoZSB3ZWlnaHQgaXMsbWVhbmluZyBoaWdobHkgb3ZlcmxhcHBpbmcgYm94ZXMgd2lsbCBiZSBzaWduaWZpY2FudGx5XG4vLyBwZW5hbGl6ZWQuIE9uIHRoZSBvdGhlciBoYW5kLCBhIG5vbi1vdmVybGFwcGluZyBib3ggd2lsbCBub3QgYmUgcGVuYWxpemVkLlxuZnVuY3Rpb24gc3VwcHJlc3NXZWlnaHQoaW91VGhyZXNob2xkOiBudW1iZXIsIHNjYWxlOiBudW1iZXIsIGlvdTogbnVtYmVyKSB7XG4gIGNvbnN0IHdlaWdodCA9IE1hdGguZXhwKHNjYWxlICogaW91ICogaW91KTtcbiAgcmV0dXJuIGlvdSA8PSBpb3VUaHJlc2hvbGQgPyB3ZWlnaHQgOiAwLjA7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZ0NvbXBhcmF0b3IoYzE6IENhbmRpZGF0ZSwgYzI6IENhbmRpZGF0ZSkge1xuICAvLyBGb3Igb2JqZWN0cyB3aXRoIHNhbWUgc2NvcmVzLCB3ZSBtYWtlIHRoZSBvYmplY3Qgd2l0aCB0aGUgbGFyZ2VyIGluZGV4IGdvXG4gIC8vIGZpcnN0LiBJbiBhbiBhcnJheSB0aGF0IHBvcHMgZnJvbSB0aGUgZW5kLCB0aGlzIG1lYW5zIHRoYXQgdGhlIG9iamVjdCB3aXRoXG4gIC8vIHRoZSBzbWFsbGVyIGluZGV4IHdpbGwgYmUgcG9wcGVkIGZpcnN0LiBUaGlzIGVuc3VyZXMgdGhlIHNhbWUgb3V0cHV0IGFzXG4gIC8vIHRoZSBUZW5zb3JGbG93IHB5dGhvbiB2ZXJzaW9uLlxuICByZXR1cm4gKGMxLnNjb3JlIC0gYzIuc2NvcmUpIHx8XG4gICAgICAoKGMxLnNjb3JlID09PSBjMi5zY29yZSkgJiYgKGMyLmJveEluZGV4IC0gYzEuYm94SW5kZXgpKTtcbn1cbiJdfQ==