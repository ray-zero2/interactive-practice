import WebGl from './webgl';

export default class Index {
  constructor() {
    this.webgl = new WebGl(document.querySelector('.canvas'));
    this.container = document.querySelector('.contents');
    this.documentElement = document.documentElement;
    this.resolution = {
      width: 0,
      height: 0,
      documentHeight: 0
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
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(e) {
    const scroll = window.scrollY;
    const progress = scroll / (this.resolution.documentHeight - this.resolution.height);
    console.log(progress);
    this.webgl.setProgress(progress)
  }

  handleResize() {
    this.resolution.width = window.innerWidth;
    this.resolution.height = window.innerHeight;
    this.resolution.documentHeight = this.documentElement.scrollHeight
    this.webgl.resize(this.resolution.width, this.resolution.height);
  }
}


