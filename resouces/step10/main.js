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
  const image = document.createElement('img');
  image.src = await people[0].mask.toImageData();
  console.log({image});
  document.body.append(image);
}


window.addEventListener('load' , () => { app() });
