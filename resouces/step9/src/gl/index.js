import WebGl from './webgl';

export default class Index {
  constructor() {
    this.webgl = new WebGl(document.querySelector('.canvas'));
    this.resolution = {
      width: 0,
      height: 0
    }
    this.progress = 0;
    this.init();
  }

  async init() {
    await this.webgl.init();
    this.handleResize();
    this.bind();
    this.webgl.start();
  }

  bind() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.resolution.width = window.innerWidth;
    this.resolution.height = window.innerHeight;
    this.webgl.resize(this.resolution.width, this.resolution.height);
  }
}


