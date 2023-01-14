import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';

export default class HumanDetector {
  constructor() {
    this.segmenter = null;
    // // const segmentationConfig = {multiSegmentation: false, segmentBodyParts: falsBe};
    // const segmentedPeople = await segmenter.segmentPeople(imageElement);
    // console.log(segmentedPeople);
  }

  async segmentPeople(image) {
    const segmentedPeople = await this.segmenter.segmentPeople(image);
    return segmentedPeople;
  }

  /**
   * 
   * @param { ImageElement } image 
   * @param {*} options 
   * @returns { ImageData } 
   */
  async getPeopleMask(image, options) {
    const segmentedPeople = await this.segmentPeople(image);
    const foregroundColor = {r: 0, g: 0, b: 0, a: 0};
    const backgroundColor = {r: 255, g: 255, b: 255, a: 255};
    const drawContour = false;
    const foregroundThreshold = 0.3;
    const mask = await bodySegmentation.toBinaryMask(segmentedPeople, foregroundColor, backgroundColor, drawContour, foregroundThreshold);
    return mask;
  }

  async init() {
    this.segmenter = await this.#createSegmenter();
  }


  async #createSegmenter() {
    const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
    const segmenterConfig = {
      runtime: 'tfjs',
      modelType: 'general'
    }
    const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
    return segmenter
  }
}
