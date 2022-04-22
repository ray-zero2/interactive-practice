
import './style.scss'
import Title from './src/title';

class Intera3 {
  constructor() {
    this.title1 = new Title('.js-title1');
    this.title2 = new Title('.js-title2');

    this.bind();
  }

  bind() {
    window.addEventListener('load', this.handleLoaded.bind(this));
  }

  handleLoaded() {
    setTimeout(() => {
      this.title1.start();
      this.title2.start();
    }, 1000);
  }
}

const intera = new Intera3();