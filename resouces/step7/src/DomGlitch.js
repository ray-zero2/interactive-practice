
import colorConvert from "color-convert";

import { rgbaStr2obj } from './utils/color';
import { mix } from './utils/mathUtils';
import { gui } from "./utils/gui";

export default class DomGlitch {
  constructor(selector = ".js-glitch") {
    this.selector = selector;
    this.$root = document.querySelector(selector);
    if(!this.$root) throw new Error('Element is not found');

    this.$content = this.$root.querySelector(selector + '__content');
    this.$copiedElement = null;

    this.isActive = false;
    this.time = 0;

    this.property = {
      factor: 0,
      default: {
        red: 0,
        green: 0,
        blue: 0,
        hue: 0,
        saturation: 0,
        value: 0
      },
      clipMinWidth: 94,
      clipPositionRange: 1.4,
      transformRange: 10,
      scaleRange: 0.3,
      force: false
    };

    this.gui = gui;
    this.gui.close();

    this.init();
  }

  init() {
    this.setCopiedElement();
    this.setDefaultValues();
    // this.setGui();
  }

  setCopiedElement() {
    this.$copiedElement = this.createCopiedElement();
    this.$root.append(this.$copiedElement);
  }

  createCopiedElement() {
    const element = this.$content.cloneNode(true);
    const contentClassName = element.getAttribute('class');
    const copiedClassName = contentClassName.replace('__content', '__copy');
    element.classList.replace(contentClassName, copiedClassName);
    element.setAttribute('aria-hidden', true);
    return element;
  }

  setDefaultValues() {
    const style = window.getComputedStyle(this.$content);
    const color = rgbaStr2obj(style.color);
    const {red, green, blue} = color;
    this.property.default.red = red;
    this.property.default.green = green;
    this.property.default.blue = blue;

    const hsv = colorConvert.rgb.hsv(red, green, blue);
    this.property.default.hue = hsv[0];
    this.property.default.saturation = hsv[1];
    this.property.default.value = hsv[2];
  }

  setGui() {
    if(!this.gui) return;
    this.gui.add(this.property, 'transformRange', 0, 100, 1);
    this.gui.add(this.property, 'scaleRange', 0, 2, 0.01);
    this.gui.add(this.property, 'clipMinWidth', 0, 100, 1);
    this.gui.add(this.property, 'force').onFinishChange((e) => {
      if(this.property.force) this.start();
      else this.stop();
    });
  }

  start(options) {
    if(this.isActive) return;

    this.setActiveStatus(true);
    // this.animate();
    // const duration = options?.duration ?? 0;

    // gsap.to(this.property, {
    //   factor: 1,
    //   duration,
    //   ease: 'power4.in',
    //   onComplete: () => {
    //     if(options?.callback) options.callback();
    //   }
    // })
  }

  stop(options) {
    if(!this.isActive) return;
    if(this.property.force) return;
    // const duration = options?.duration ?? 0;
    // gsap.to(this.property, {
    //   factor: 0,
    //   duration,
    //   ease: 'power4.out',
    //   onComplete: () => {
    //     // if(this.requestId) cancelAnimationFrame(this.requestId);
    //     this.setActiveStatus(false);
    //     if(options?.callback) options.callback();
    //   }
    // })
    this.setActiveStatus(false);
  }

  setActiveStatus(isActive) {
    console.log({isActive});
    if(isActive) {
      this.$root.classList.add('is-active');
      this.isActive = true;
    } else {
      this.$root.classList.remove('is-active');
      this.isActive = false;
    }
  }

  update({ deltaTime }) {
    this.time += deltaTime;
    this.glitch();
  }

  glitch() {
    if(!this.$copiedElement) return;

    const ratio = this.property.force ? 1 : this.property.factor;

    // color
    const defaultColor = this.property.default;
    const { hue, saturation, value } = defaultColor;
    const targetHue = mix(hue, Math.floor(Math.random()*360), ratio);
    const targetSaturation = mix(saturation, 100, ratio);
    const targetValue = mix(value, 100, ratio);
    const [red, green, blue] = colorConvert.hsv.rgb(targetHue, targetSaturation, targetValue);
    this.$copiedElement.style.color = `rgb(${red}, ${green}, ${blue})`;


    // translate
    const TRANSLATE = this.property.transformRange;
    const SCALE = this.property.scaleRange;
    const targetTranslateX = (Math.random() * 2 - 1) * TRANSLATE;
    const targetTranslateY = (Math.random() * 2 - 1) * TRANSLATE;
    const targetScaleX = 1 + (Math.random() * 2 - 1) * SCALE;
    const targetScaleY = 1 + (Math.random() * 2 - 1) * SCALE;

    const translateX = mix(0, targetTranslateX, ratio);
    const translateY = mix(0, targetTranslateY, ratio);
    const scaleX = mix(1, targetScaleX, ratio);
    const scaleY = mix(1, targetScaleY, ratio);

    this.$copiedElement.style.transform = `matrix(
      ${scaleX}, 0,
      0, ${scaleY},
      ${translateX}, ${translateY}
    )`;

    // clip
    const CLIP_MIN_WIDTH = this.property.clipMinWidth;
    const CLIP_POSITION_RANGE = this.property.clipPositionRange;
    const targetLeft = (Math.random() * CLIP_POSITION_RANGE - CLIP_POSITION_RANGE/2) * 100;
    const targetRight = targetLeft + Math.max(Math.random() * (100 - targetLeft), CLIP_MIN_WIDTH);
    const targetTop =(Math.random() * CLIP_POSITION_RANGE - CLIP_POSITION_RANGE/2) * 100;
    const targetBottom = targetTop + Math.max(Math.random() * (100 - targetTop), CLIP_MIN_WIDTH);


    const left = Math.round(mix(0, targetLeft, ratio));
    const right = Math.round(mix(100, targetRight, ratio));
    const top = Math.round(mix(0, targetTop, ratio));
    const bottom = Math.round(mix(100, targetBottom, ratio));

    this.$copiedElement.style.clipPath =
      `polygon(
        ${left}% ${top}%,
        ${right}% ${top}%,
        ${right}% ${bottom}%,
        ${left}% ${bottom}%
      )`;
  }
}