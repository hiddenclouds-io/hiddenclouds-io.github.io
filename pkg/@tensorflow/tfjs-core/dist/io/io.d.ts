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
/// <amd-module name="@tensorflow/tfjs-core/dist/io/io" />
import './indexed_db';
import './local_storage';
import { browserFiles } from './browser_files';
import { browserHTTPRequest, http, isHTTPScheme } from './http';
import { concatenateArrayBuffers, decodeWeights, decodeWeightsStream, encodeWeights, getModelArtifactsForJSON, getModelArtifactsForJSONSync, getModelArtifactsInfoForJSON, getWeightSpecs } from './io_utils';
import { fromMemory, fromMemorySync, withSaveHandler, withSaveHandlerSync } from './passthrough';
import { getLoadHandlers, getSaveHandlers, registerLoadRouter, registerSaveRouter } from './router_registry';
import { IOHandler, IOHandlerSync, LoadHandler, LoadOptions, ModelArtifacts, ModelArtifactsInfo, ModelJSON, ModelStoreManager, OnProgressCallback, RequestDetails, SaveConfig, SaveHandler, SaveResult, TrainingConfig, WeightGroup, WeightsManifestConfig, WeightsManifestEntry, WeightData } from './types';
import { loadWeights, weightsLoaderFactory } from './weights_loader';
import { CompositeArrayBuffer } from './composite_array_buffer';
export { copyModel, listModels, moveModel, removeModel } from './model_management';
export { browserFiles, browserHTTPRequest, CompositeArrayBuffer, concatenateArrayBuffers, decodeWeights, decodeWeightsStream, encodeWeights, fromMemory, fromMemorySync, getLoadHandlers, getModelArtifactsForJSON, getModelArtifactsForJSONSync, getModelArtifactsInfoForJSON, getSaveHandlers, getWeightSpecs, http, IOHandler, IOHandlerSync, isHTTPScheme, LoadHandler, LoadOptions, loadWeights, ModelArtifacts, ModelArtifactsInfo, ModelJSON, ModelStoreManager, OnProgressCallback, registerLoadRouter, registerSaveRouter, RequestDetails, SaveConfig, SaveHandler, SaveResult, TrainingConfig, WeightData, WeightGroup, weightsLoaderFactory, WeightsManifestConfig, WeightsManifestEntry, withSaveHandler, withSaveHandlerSync, };
