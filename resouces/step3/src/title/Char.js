import { mix, clamp } from "../mathUtils";

const PARAM = {
  START: {
    x: 0,
    y: -4
  },
  END : {
    x: 0,
    y: 0
  }
}


export default class Char {
  constructor(char, groupIndex, charIndex) {
    this.charElement = char;
    this.groupIndex = groupIndex;
    this.charIndex = charIndex;
    this.position = { x: PARAM.START.x, y: PARAM.START.y }
    this.target = {x: 0, y: 0}
    this.scale = 1;
    this.delay = groupIndex * 200 + charIndex * 50;
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  setScale(scale) {
    this.scale = scale;
  }

  setTarget(target) {
    this.target = target;
  }

  update(progress) {
    setTimeout(() => {
      const endX = mix(PARAM.END.x, this.target.x * 20, progress);
      const endY = mix(PARAM.END.y, this.target.y * 20, progress);

      this.position.x += (endX - this.position.x) * 0.01;
      this.position.y += (endY - this.position.y) * 0.01;
    }, this.delay);
  }

  draw() {
    this.charElement.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.position.x}, ${this.position.y})`;
    // this.charElement.style.opacity = this.opacity;
  }
}