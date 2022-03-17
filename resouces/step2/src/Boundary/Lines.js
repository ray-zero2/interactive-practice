import { randomRange } from "../mathUtils";

const LINES_NUM_X = 15;
const LINES_NUM_Y = 15;

export default class Lines {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.size = {
      x: 0, y: 0
    }
    this.ctx = this.canvas.getContext('2d');
    this.ctx.globalCompositeOperation = 'lighter';
    this.time = 0;
    this.range = {
      x: [0, 0],
      y: [0, 0]
    }
    this.speedX = randomRange(1, 3);
    this.speedY = randomRange(1, 3);
    this.lineWidth = 2;
  }

  init() {
    this.setSize();
  }

  getCanvas() {
    return this.canvas;
  }

  getImage() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  setLineWidth(width) {
    this.lineWidth = width;
    this.ctx.lineWidth = width;
  }

  setSize(width, height) {
    this.size.x = width;
    this.size.y = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  update(deltaTime) {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.time += deltaTime;

    this.range.x[0] = (this.size.x * Math.sin(this.time * this.speedX) + this.size.x) * 0.5;
    this.range.x[1] = (this.size.x * Math.sin(this.time * this.speedX * 1.1 + Math.PI) + this.size.x) * 0.5;
    this.range.y[0] = (this.size.y * Math.sin(this.time * this.speedY) + this.size.y) * 0.5;
    this.range.y[1] = (this.size.y * Math.sin(this.time * this.speedY * 1.1 + Math.PI) + this.size.y) * 0.5;

    this.draw();
  }

  draw() {
    this.ctx.strokeStyle= "#ff0000";
    this.ctx.beginPath();
    for(let i = 0; i < LINES_NUM_X; i++) {
      const randomY = randomRange(this.range.y[0], this.range.y[1]);
      this.setLine(0, randomY, this.size.x, randomY);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.strokeStyle= "#00ff00";
    this.ctx.beginPath();
    for(let i = 0; i < LINES_NUM_Y; i++) {
      const randomX = randomRange(this.range.x[0], this.range.x[1]);
      this.setLine(randomX, 0, randomX, this.size.y);
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }

  setLine(x1, y1, x2, y2) {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
  }
}