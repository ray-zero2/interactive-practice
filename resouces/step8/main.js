import './style.scss'
import Felipe from './src/Felipe';

const start = async () => {
  console.log('start');
  new Felipe('.js-fp');
}

window.addEventListener('load', start);
