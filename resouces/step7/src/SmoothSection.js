import * as mathUtils from './utils/mathUtils';


export default class SmoothSection {
  constructor(selector, id) {
    this.id = id;
    this.$root = document.querySelector(selector);
    this.$content = this.$root.querySelector(selector + '__content');
    this.scroll = 0;
    this.progress = 0;
    this.isActive = true;
    this.observer = null;
  }

  init() {
    // console.log(this.$root);
    // this.setContentSize();
    this.observer = new IntersectionObserver(this.handleObserve.bind(this), { rootMargin: '0px' })
    this.observer.observe(this.$root);
  }

  setContentSize() {
    // const contentHeight = this.$content.getBoundingClientRect().height;
    // this.$root.style.setProperty('--section-height', `${contentHeight}px`);
  }

  update() {
    if(!this.isActive) return;
    const rect =  this.$root.getBoundingClientRect();
    const scrolledHeight = rect.height - window.innerHeight;
    this.scroll = mathUtils.clamp(-rect.top, 0, scrolledHeight);
    this.progress = this.scroll / scrolledHeight
    this.$content.style.transform = `translate3d(0, ${this.scroll}px, 0)`;
  }

  handleObserve(entities) {
    const root = entities[0];
    const { isIntersecting } = root;
    this.isActive = isIntersecting;
  }
}