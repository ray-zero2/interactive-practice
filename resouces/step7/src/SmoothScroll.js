import AnimationFramer from "@ray-zero2/animation-framer";
import Section1 from "./Section1";
import { device } from "./utils/device";

export default class SmoothScroll {
  constructor(selector) {
    this.id = 'smoothScroll';
    this.isPc = device.isPc;
    this.$root = document.querySelector(selector);
    this.$fixed = this.$root.querySelector(selector + '__inner');
    this.$content = this.$root.querySelector(selector + '__content');
    this.framer = AnimationFramer.getInstance();
    this.scroll = 0;
    this.section1 = new Section1('.js-section');

    this.init();
    // this.bind();
    // window.addEventListener('resize', this.resize.bind(this));

  }

  init() {
    this.setContentSize();
    this.framer.add({
      id: this.id,
      update: this.update.bind(this)
    })
    this.framer.start();
  }

  // bind() {
  //   window.addEventListener('focus', this.handleFocus.bind(this));
  //   window.addEventListener('blur', this.handleBlur.bind(this));
  //   window.addEventListener('mouseover', this.handleMouseOver.bind(this));
  //   window.addEventListener('mouseout', this.handleMouseOut.bind(this));
  // }


  setContentSize() {
    const contentHeight = this.$content.getBoundingClientRect().height;
    this.$root.style.setProperty('--content-height', `${contentHeight}px`);
  }

  update({deltaTime, time}) {
    const coeff = 0.9;
    this.scroll += (window.scrollY - this.scroll) * this.framer.getLerpCoeff(coeff);
    if(this.isPc) this.$content.style.transform = `translate3d(0, ${-this.scroll}px, 0)`;

    this.section1.update({deltaTime, time}, this.scroll);
  }

  resize() {
    this.setContentSize();
  }

  handleFocus(e) {
    console.log('focus');
    this.isFocused = true;
  }

  handleBlur(e) {
    console.log('blur');
    this.isFocused = false;
  }

  handleMouseOver() {
    console.log('over');
    this.pointerExists = true;
  }

  handleMouseOut() {
    console.log('out');
    this.pointerExists = false;
  }

  // setActiveStatus() {
  //   const isActive = this.isFocused || 
  //   const isInactive = !this.isFocused || !this.pointerExists
  // }
}