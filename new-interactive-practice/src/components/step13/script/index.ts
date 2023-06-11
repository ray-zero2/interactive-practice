import GlContent from './src/GlContent/index';

window.addEventListener('load', () => {
  new GlContent(document.querySelector('.canvas')!);
})

