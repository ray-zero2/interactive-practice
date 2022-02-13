import { lerp } from "./mathUtils";

const SIZE_RATIO = 0.75;

export default class Square {
  constructor(id) {
    this.element = null;
    this.id = id;
    this.time = 0;
    this.isMouseDown = false;
    this.position = { x: 0, y: 0 };
    this.size = { x: 0, y: 0 };
    this.scale = SIZE_RATIO;
    this.speed = 0.2;
    this.target = {
      position: { x: 0, y: 0 },
      distance: 0
    };
    this.windowSize = {x: 0, y: 0};
  }

  update(deltaTime) {
    this.time += deltaTime;
    const mouseFromCenter = this.#normalizedMouseFromCenter();
    const invertMouseFromCenter = {
      x: -mouseFromCenter.x,
      y: -mouseFromCenter.y
    }
    const moveRange = {
      x: this.windowSize.x / 2 - this.size.x / 2,
      y: this.windowSize.y / 2 - this.size.y / 2,
    };
    const move = {
      x: lerp(invertMouseFromCenter.x, 0, 1, 0, moveRange.x),
      y: lerp(invertMouseFromCenter.y, 0, 1, 0, moveRange.y),
    };
    const movedUpperLeftPosition = {
      x: moveRange.x + move.x,
      y: moveRange.y + move.y
    }
    this.position.x += (movedUpperLeftPosition.x - this.position.x) * this.speed;
    this.position.y += (movedUpperLeftPosition.y - this.position.y) * this.speed;
  }

  draw() {
    this.element.style.transform = `matrix(1, 0, 0, 1, ${this.position.x}, ${this.position.y})`;
  }

  setSize(x, y) {
    this.size.x = x * this.scale;
    this.size.y = y * this.scale;
  }

  setWindowSize(x, y) {
    this.windowSize.x = x;
    this.windowSize.y = y;
  }

  setScale(num) {
    this.scale = num;
  }

  setSpeed(value) {
    this.speed = value;
  }


  /**
 *
 * @param { { x: number, y: number } } position
 */
  setTarget(position) {
    this.target.position = position;
  }

  setMouseDown(flag) {
    this.isMouseDown = flag;
  }



  styleElement() {
    if(!this.element) return;
    this.element.style.width = `${this.size.x}px`;
    this.element.style.height = `${this.size.y}px`;
  }

  init() {
    this.#addElement();
    this.styleElement();
  }

  #addElement() {
    this.element = document.createElement('div');
    this.element.classList.add('square');
    document.querySelector('.mv').append(this.element);
  }

  #normalizedMouseFromCenter() {
    const center = { x: this.windowSize.x/2, y: this.windowSize.y/2 };
    const mouse = this.target.position;
    const mouseFromCenter = { 
      x: mouse.x / center.x -  1,
      y: mouse.y / center.y - 1,
    };
    return mouseFromCenter
  }
}