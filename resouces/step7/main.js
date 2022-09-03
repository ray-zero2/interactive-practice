import './style.scss'

import AnimationFramer from '@ray-zero2/animation-framer';
import DomGlitch from './src/DomGlitch';
import Intersect from './src/Intersect';
import Canvas from './src/canvas/index';
import Loading from './src/Loading';

const animationFramer = AnimationFramer.getInstance();
animationFramer.start();

const loading = new Loading('.js-loading');
loading.hide();

const canvasInstance = new Canvas();
console.log(canvasInstance);

const domGlitchSelector = '.dom-glitch';
const domGlitch = new DomGlitch(domGlitchSelector);


const start = async () => {


  loading.hide();
  domGlitch.start({ duration: 1 });

  setInterval(() => {
    domGlitch.stop({ duration: 0.4 });
    setTimeout(() => {
      domGlitch.start({ duration: 1 });
    }, 2000);
  }, 4000);
}

new Intersect(domGlitchSelector);


window.addEventListener('load', start);