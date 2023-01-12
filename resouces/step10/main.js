import './style.scss'
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';


const app = async () => {
  const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
  const segmenterConfig = {
    runtime: 'tfjs',
    modelType: 'general'
  }
  const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
  const imageElement = document.querySelector('.js-image');
  console.log(imageElement);
  // const segmentationConfig = {multiSegmentation: false, segmentBodyParts: falsBe};
  // const segmentedPeople = await segmenter.segmentPeople(imageElement, segmentationConfig);
  const segmentedPeople = await segmenter.segmentPeople(imageElement);
  console.log(segmentedPeople);
 ////////////////

  const foregroundColor = {r: 0, g: 0, b: 0, a: 0};
  const backgroundColor = {r: 0, g: 0, b: 0, a: 255};
  const drawContour = false;
  const foregroundThreshold = 0.3;
  const backgroundDarkeningMask = await bodySegmentation.toBinaryMask(segmentedPeople, foregroundColor, backgroundColor, drawContour, foregroundThreshold);
  const opacity = 0.7;
  const maskBlurAmount = 0; // Number of pixels to blur by.
  const canvas = document.createElement('canvas');
  console.log(imageElement.naturalWidth, imageElement.naturalHeight);
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  
  const people = await bodySegmentation.drawMask(canvas, imageElement, backgroundDarkeningMask, backgroundDarkeningMask, opacity, maskBlurAmount);

//  /////////////
  // const maskImageData = await people[0].mask.toImageData();
  
  // const canvas = document.createElement('canvas');
  // const ctx = canvas.getContext('2d');
  // canvas.width = maskImageData.width;
  // canvas.height = maskImageData.height;
  // ctx.putImageData(maskImageData, 0, 0 );
  // ctx.globalAlpha = 0.3;
  // ctx.drawImage(imageElement, 0, 0, maskImageData.width, maskImageData.height);
  document.body.append(canvas);
}


window.addEventListener('load' , () => { app() });
