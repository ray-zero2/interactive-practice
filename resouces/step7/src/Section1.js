import SmoothSection from "./SmoothSection";
import { gsap } from 'gsap';
import DomGlitch from "./DomGlitch";

export default class Section1 extends SmoothSection {
  constructor(selector) {
    const id = 'section1';
    super(selector, id);
    this.tl = null;
    const sectionSelector = '.section1';
    this.titleGlitch = new DomGlitch(sectionSelector + ' .title1 .dom-glitch')
    this.$title = document.querySelector(sectionSelector + ' .title1 h2');
    this.$desc1 = document.querySelector(sectionSelector + ' .desc1');
    this.$imagesLeft = document.querySelector(sectionSelector + ' .images-left');
    this.$imagesRight = document.querySelector(sectionSelector + ' .images-right');

    this.init();
  }

  init() {
    super.init();
    this.createTImeline();
    this.setContentHeight();
  }

  update({deltaTime}) {
    super.update();
    this.titleGlitch.update({ deltaTime });
    this.tl.progress( this.progress );
  }

  createTImeline() {
    const coeff = 60;
    this.tl = gsap.timeline({ paused: true });
    this.tl
      .addLabel('title')
      .set(this.titleGlitch.property, { factor: 1 })
      .call(() => { this.titleGlitch.$root.classList.add('is-active'); })
      .fromTo(this.titleGlitch.$root, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.5
      })
      .to(this.titleGlitch.property, {
        factor: 0,
        duration: 0.8,
        ease: "none"//"Power3.in"
      }, '<')
      .to(this.titleGlitch.$root, {
        y: -coeff * 0.5,
        duration: 0.5
      })
      .to(this.titleGlitch.$root, {
        opacity: 0,
        duration: 0.4
      }, ">-0.1" )

    this.tl
      .addLabel('desc1')
      .fromTo(this.$desc1, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.4
      })
      .fromTo(this.$desc1, {
        y: 0.2 * coeff
      }, {
        y: 0.2 * -coeff,
        duration: 1.2,
        ease: "none"
      }, '<=')
      .to(this.$desc1, {
        opacity: 0,
        duration: 0.4
      }, ">-0.4" );

    this.tl
      .addLabel('image1')
      .fromTo(this.$imagesLeft, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.5,
      })
      .fromTo(this.$imagesLeft, {
        y: 0.1*coeff
      }, {
        y: -0.1*coeff,
        duration: 1
      })
      .to(this.$imagesLeft, {
        xPercent: -5,
        opacity: 0,
        duration: 0.6,
        ease: "Power3.out"
      }, '>')

    this.tl
      .addLabel('image2')
      .fromTo(this.$imagesRight, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.5,
      })
      .fromTo(this.$imagesRight, {
        y: 0.1*coeff
      }, {
        y: -0.1*coeff,
        duration: 1
      })
      .to(this.$imagesRight,{
        xPercent: 5,
        opacity: 0,
        duration: 0.6,
        ease: "Power3.out"
      }, '>')

  }

  setContentHeight() {
    const totalDuration = this.tl.totalDuration();
    const height = window.innerHeight * 2 * totalDuration + 'px';
    this.$root.style.setProperty('--section-height', height);
  }
}