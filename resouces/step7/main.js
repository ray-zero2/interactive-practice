import './style.scss'

import Loading from './src/Loading';
import SmoothScroll from './src/SmoothScroll';
import { device } from './src/utils/device';

const loading = new Loading('.js-loading');

const start = async () => {
  const isPc = device.isPc;
  if(isPc) document.body.setAttribute('data-device', 'pc');
  else  document.body.setAttribute('data-device', 'sp');

  const smoothScroll = new SmoothScroll('.main')
  setTimeout(() => {
    loading.hide();
  }, 1000);
}

window.addEventListener('load', start);
