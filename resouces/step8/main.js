import './style.scss'
import Felipe from './src/Felipe';

const start = async () => {
  console.log('inspired by Felipe Pantone');
  new Felipe('.js-fp');
}

window.addEventListener('load', start);
