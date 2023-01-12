import './style.scss'
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';


const app = async () => {
  console.log('app');
  const model = bodySegmentation.SupportedModels.BodyPix;
  const segmenterConfig = {
    architecture: 'ResNet50',
    outputStride: 32,
    quantBytes: 2
  };
  const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
  console.log(segmenter);
  const imageElement = document.querySelector('.js-image');
  console.log(imageElement);
  const segmentationConfig = {multiSegmentation: true, segmentBodyParts: false};
  const people = await segmenter.segmentPeople(imageElement, segmentationConfig);
  console.log(people);
  const maskImageData = await people[0].mask.toImageData();
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = maskImageData.width;
  canvas.height = maskImageData.height;
  ctx.putImageData(maskImageData, 0, 0 );
  ctx.globalAlpha = 0.3;
  ctx.drawImage(imageElement, 0, 0, maskImageData.width, maskImageData.height);
  document.body.append(canvas);
}


window.addEventListener('load' , () => { app() });
