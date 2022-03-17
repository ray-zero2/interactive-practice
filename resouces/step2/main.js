import Boundary from './src/Boundary/Index';
import Intera from './src/core/Intera';
import './style.scss'

class Intera1 extends Intera {

  constructor() {
    super();

    this.boundary = new Boundary('.js-canvas');
    this.init();
  }

  init() {
    this.boundary.init();
  }

  update() {
    this.boundary.update(this.deltaTime);
  }

  draw() {
    this.boundary.draw();
  }

  handleResize(e) {}

  handleLoad() {
    this.handleResize();
  }

  bind() {
    super.bind();
    window.addEventListener('load', this.handleLoad.bind(this), { passive: true });
  }
}

const intera = new Intera1();
intera.start();