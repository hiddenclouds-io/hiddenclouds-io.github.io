/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
// tslint:disable-next-line: no-imports-from-dist
import * as tfOps from '@tensorflow/tfjs-core/dist/ops/ops_for_converter';
import { getParamValue } from './utils';
export const executeOp = (node, tensorMap, context, ops = tfOps) => {
    switch (node.op) {
        case 'Fill': {
            const shape = getParamValue('shape', node, tensorMap, context);
            const dtype = getParamValue('dtype', node, tensorMap, context);
            const value = getParamValue('value', node, tensorMap, context);
            return [ops.fill(shape, value, dtype)];
        }
        case 'LinSpace': {
            const start = getParamValue('start', node, tensorMap, context);
            const stop = getParamValue('stop', node, tensorMap, context);
            const num = getParamValue('num', node, tensorMap, context);
            return [ops.linspace(start, stop, num)];
        }
        case 'Multinomial': {
            const logits = getParamValue('logits', node, tensorMap, context);
            const numSamples = getParamValue('numSamples', node, tensorMap, context);
            const seed = getParamValue('seed', node, tensorMap, context);
            return [ops.multinomial(logits, numSamples, seed)];
        }
        case 'OneHot': {
            const indices = getParamValue('indices', node, tensorMap, context);
            const depth = getParamValue('depth', node, tensorMap, context);
            const onValue = getParamValue('onValue', node, tensorMap, context);
            const offValue = getParamValue('offValue', node, tensorMap, context);
            const dtype = getParamValue('dtype', node, tensorMap, context);
            return [ops.oneHot(indices, depth, onValue, offValue, dtype)];
        }
        case 'Ones': {
            return [ops.ones(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'OnesLike': {
            return [ops.onesLike(getParamValue('x', node, tensorMap, context))];
        }
        case 'RandomStandardNormal': {
            return [ops.randomStandardNormal(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context), getParamValue('seed', node, tensorMap, context))];
        }
        case 'RandomUniform': {
            return [ops.randomUniform(
                // tslint:disable-next-line:no-any
                getParamValue('shape', node, tensorMap, context), getParamValue('minval', node, tensorMap, context), getParamValue('maxval', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'RandomUniformInt': {
            return [ops.randomUniformInt(getParamValue('shape', node, tensorMap, context), getParamValue('minval', node, tensorMap, context), getParamValue('maxval', node, tensorMap, context), getParamValue('seed', node, tensorMap, context))];
        }
        case 'Range': {
            const start = getParamValue('start', node, tensorMap, context);
            const stop = getParamValue('stop', node, tensorMap, context);
            const step = getParamValue('step', node, tensorMap, context);
            return [ops.range(start, stop, step, getParamValue('dtype', node, tensorMap, context))];
        }
        case 'TruncatedNormal': {
            const shape = getParamValue('shape', node, tensorMap, context);
            const mean = getParamValue('mean', node, tensorMap, context);
            const stdDev = getParamValue('stdDev', node, tensorMap, context);
            const seed = getParamValue('seed', node, tensorMap, context);
            return [ops.truncatedNormal(shape, mean, stdDev, getParamValue('dtype', node, tensorMap, context), seed)];
        }
        case 'Zeros': {
            return [ops.zeros(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'ZerosLike': {
            return [ops.zerosLike(getParamValue('x', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};
export const CATEGORY = 'creation';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpb25fZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvbnZlcnRlci9zcmMvb3BlcmF0aW9ucy9leGVjdXRvcnMvY3JlYXRpb25fZXhlY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBR0gsaURBQWlEO0FBQ2pELE9BQU8sS0FBSyxLQUFLLE1BQU0sa0RBQWtELENBQUM7QUFNMUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUV0QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQ2xCLENBQUMsSUFBVSxFQUFFLFNBQTBCLEVBQUUsT0FBeUIsRUFDakUsR0FBRyxHQUFHLEtBQUssRUFBWSxFQUFFO0lBQ3hCLFFBQVEsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNmLEtBQUssTUFBTSxDQUFDLENBQUM7WUFDWCxNQUFNLEtBQUssR0FDUCxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFhLENBQUM7WUFDakUsTUFBTSxLQUFLLEdBQ1AsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBYSxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxHQUNQLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsQ0FBQztZQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFDRCxLQUFLLFVBQVUsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxLQUFLLEdBQ1AsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxDQUFDO1lBQy9ELE1BQU0sSUFBSSxHQUNOLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxF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bGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7RGF0YVR5cGUsIFRlbnNvciwgVGVuc29yMUR9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWltcG9ydHMtZnJvbS1kaXN0XG5pbXBvcnQgKiBhcyB0Zk9wcyBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUvZGlzdC9vcHMvb3BzX2Zvcl9jb252ZXJ0ZXInO1xuXG5pbXBvcnQge05hbWVkVGVuc29yc01hcH0gZnJvbSAnLi4vLi4vZGF0YS90eXBlcyc7XG5pbXBvcnQge0V4ZWN1dGlvbkNvbnRleHR9IGZyb20gJy4uLy4uL2V4ZWN1dG9yL2V4ZWN1dGlvbl9jb250ZXh0JztcbmltcG9ydCB7SW50ZXJuYWxPcEV4ZWN1dG9yLCBOb2RlfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCB7Z2V0UGFyYW1WYWx1ZX0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlT3A6IEludGVybmFsT3BFeGVjdXRvciA9XG4gICAgKG5vZGU6IE5vZGUsIHRlbnNvck1hcDogTmFtZWRUZW5zb3JzTWFwLCBjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0LFxuICAgICBvcHMgPSB0Zk9wcyk6IFRlbnNvcltdID0+IHtcbiAgICAgIHN3aXRjaCAobm9kZS5vcCkge1xuICAgICAgICBjYXNlICdGaWxsJzoge1xuICAgICAgICAgIGNvbnN0IHNoYXBlID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc2hhcGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcltdO1xuICAgICAgICAgIGNvbnN0IGR0eXBlID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnZHR5cGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIERhdGFUeXBlO1xuICAgICAgICAgIGNvbnN0IHZhbHVlID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgndmFsdWUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICByZXR1cm4gW29wcy5maWxsKHNoYXBlLCB2YWx1ZSwgZHR5cGUpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdMaW5TcGFjZSc6IHtcbiAgICAgICAgICBjb25zdCBzdGFydCA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3N0YXJ0Jywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgY29uc3Qgc3RvcCA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3N0b3AnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICBjb25zdCBudW0gPSBnZXRQYXJhbVZhbHVlKCdudW0nLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICByZXR1cm4gW29wcy5saW5zcGFjZShzdGFydCwgc3RvcCwgbnVtKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnTXVsdGlub21pYWwnOiB7XG4gICAgICAgICAgY29uc3QgbG9naXRzID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnbG9naXRzJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IxRDtcbiAgICAgICAgICBjb25zdCBudW1TYW1wbGVzID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnbnVtU2FtcGxlcycsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IHNlZWQgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzZWVkJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgcmV0dXJuIFtvcHMubXVsdGlub21pYWwobG9naXRzLCBudW1TYW1wbGVzLCBzZWVkKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnT25lSG90Jzoge1xuICAgICAgICAgIGNvbnN0IGluZGljZXMgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdpbmRpY2VzJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IxRDtcbiAgICAgICAgICBjb25zdCBkZXB0aCA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2RlcHRoJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgY29uc3Qgb25WYWx1ZSA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ29uVmFsdWUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICBjb25zdCBvZmZWYWx1ZSA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ29mZlZhbHVlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgY29uc3QgZHR5cGUgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdkdHlwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgRGF0YVR5cGU7XG4gICAgICAgICAgcmV0dXJuIFtvcHMub25lSG90KGluZGljZXMsIGRlcHRoLCBvblZhbHVlLCBvZmZWYWx1ZSwgZHR5cGUpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdPbmVzJzoge1xuICAgICAgICAgIHJldHVybiBbb3BzLm9uZXMoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3NoYXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXJbXSxcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnZHR5cGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIERhdGFUeXBlKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnT25lc0xpa2UnOiB7XG4gICAgICAgICAgcmV0dXJuIFtvcHMub25lc0xpa2UoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3gnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcildO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1JhbmRvbVN0YW5kYXJkTm9ybWFsJzoge1xuICAgICAgICAgIHJldHVybiBbb3BzLnJhbmRvbVN0YW5kYXJkTm9ybWFsKFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzaGFwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyW10sXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2R0eXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyAnZmxvYXQzMicgfFxuICAgICAgICAgICAgICAgICAgJ2ludDMyJyxcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc2VlZCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUmFuZG9tVW5pZm9ybSc6IHtcbiAgICAgICAgICByZXR1cm4gW29wcy5yYW5kb21Vbmlmb3JtKFxuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3NoYXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBhbnksXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ21pbnZhbCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdtYXh2YWwnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnZHR5cGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIERhdGFUeXBlKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUmFuZG9tVW5pZm9ybUludCc6IHtcbiAgICAgICAgICByZXR1cm4gW29wcy5yYW5kb21Vbmlmb3JtSW50KFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzaGFwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyW10sXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ21pbnZhbCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdtYXh2YWwnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc2VlZCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUmFuZ2UnOiB7XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzdGFydCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IHN0b3AgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzdG9wJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgY29uc3Qgc3RlcCA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3N0ZXAnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICByZXR1cm4gW29wcy5yYW5nZShcbiAgICAgICAgICAgICAgc3RhcnQsIHN0b3AsIHN0ZXAsXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2R0eXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyAnZmxvYXQzMicgfFxuICAgICAgICAgICAgICAgICAgJ2ludDMyJyldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1RydW5jYXRlZE5vcm1hbCc6IHtcbiAgICAgICAgICBjb25zdCBzaGFwZSA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3NoYXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXJbXTtcbiAgICAgICAgICBjb25zdCBtZWFuID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnbWVhbicsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IHN0ZERldiA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3N0ZERldicsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IHNlZWQgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzZWVkJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgcmV0dXJuIFtvcHMudHJ1bmNhdGVkTm9ybWFsKFxuICAgICAgICAgICAgICBzaGFwZSwgbWVhbiwgc3RkRGV2LFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdkdHlwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgJ2Zsb2F0MzInIHxcbiAgICAgICAgICAgICAgICAgICdpbnQzMicsXG4gICAgICAgICAgICAgIHNlZWQpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdaZXJvcyc6IHtcbiAgICAgICAgICByZXR1cm4gW29wcy56ZXJvcyhcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc2hhcGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcltdLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdkdHlwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgRGF0YVR5cGUpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdaZXJvc0xpa2UnOiB7XG4gICAgICAgICAgcmV0dXJuIFtvcHMuemVyb3NMaWtlKFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCd4Jywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IpXTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IFR5cGVFcnJvcihgTm9kZSB0eXBlICR7bm9kZS5vcH0gaXMgbm90IGltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfTtcblxuZXhwb3J0IGNvbnN0IENBVEVHT1JZID0gJ2NyZWF0aW9uJztcbiJdfQ==