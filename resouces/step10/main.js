import './style.scss'
import Framer from '@ray-zero2/animation-framer';
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import HumanDetector from './src/HumanDetector';
import Mixer from './src/Mixer';
import Loading from './src/Loading';


// const app = async () => {
//   const peopleSegmenter = new HumanDetector();
//   await peopleSegmenter.init();
//   const imageElement = document.querySelector('.js-image');
//   const mask = await peopleSegmenter.getPeopleMask(imageElement);
//   const opacity = 1;
//   const maskBlurAmount = 0; // Number of pixels to blur by.
//   const canvas = document.createElement('canvas');
//   console.log(imageElement.naturalWidth, imageElement.naturalHeight);
//   canvas.width = imageElement.naturalWidth;
//   canvas.height = imageElement.naturalHeight;
  
//   const people = await bodySegmentation.drawMask(canvas, imageElement, mask, opacity, maskBlurAmount);

// //  /////////////
//   // const maskImageData = await people[0].mask.toImageData();
  
//   // const canvas = document.createElement('canvas');
//   // const ctx = canvas.getContext('2d');
//   // canvas.width = maskImageData.width;
//   // canvas.height = maskImageData.height;
//   // ctx.putImageData(maskImageData, 0, 0 );
//   // ctx.globalAlpha = 0.3;
//   // ctx.drawImage(imageElement, 0, 0, maskImageData.width, maskImageData.height);
//   document.body.append(canvas);
// }

const createPeopleSegmenter = async() => {
  const peopleSegmenter = new HumanDetector();
  await peopleSegmenter.init();
  return peopleSegmenter;
}

const fetchHumanImage = () => {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    }

    const randomNum = Math.floor((Math.random() * 9))
    image.src = `./assets/image_${randomNum}.jpg`;
  })
}

const start = async () => {
  const framer = Framer.getInstance();
  const peopleSegmenter = await createPeopleSegmenter();
  const humanImage = await fetchHumanImage();
  const canvas = document.querySelector('.js-canvas');
  canvas.width = humanImage.naturalWidth;
  canvas.height = humanImage.naturalHeight;
  const mixer = new Mixer(canvas);
  const mask = await peopleSegmenter.getPeopleMask(humanImage);


  // final settings
  mixer.setTextureImage(mask, 0);
  mixer.setTextureImage(humanImage, 1);

  const update = ({time, deltaTime}) => {
    mixer.update(deltaTime);
    mixer.draw();
  }

  framer.add({
    id: 'noise',
    update
  })
  framer.start();

  const loading = new Loading('.js-loading');
  loading.hide();
  // mixer.setTextureImage(humanImage, 0)
}

window.addEventListener('load' , () => { start() });
