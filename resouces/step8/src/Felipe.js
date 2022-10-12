import Framer from '@ray-zero2/animation-framer';
import { mouse } from './utils/wip/mouse';

export default class Feripe {
  constructor(selector) {
    this.$root = document.querySelector(selector);
    this.$rings = Array.from(this.$root.querySelectorAll('.ring'));
    this.randomValues = new Array(this.$rings.length).fill(0);
    this.baseRotation = 0;
    this.time = 0;

    this.framer = Framer.getInstance();
    this.init();
  }

  init() {
    this.randomValues = this.randomValues.map(() => Math.random());
    this.start();
  }

  start() {
    this.framer.add({
      id: 'feripe',
      update: this.update.bind(this)
    })
    this.framer.start();
  }

  update({deltaTime, time}) {
    this.time = time;
    const {x, y} = mouse.position;
    // const _time = time * 0.1;
    this.calcRotations(x, y);
  }

  calcRotations(mouseX, mouseY) {
    this.$rings.forEach(($ring, index) => {
      const randomValue = this.randomValues[index];
      const _time = this.time * 0.2 * randomValue + (mouseX + mouseY) * 0.2 * randomValue;
      const rotation = Math.round((_time - Math.floor(_time)) * 360);
      $ring.style.transform = `rotateZ(${rotation}deg)`;
    })
  }
}