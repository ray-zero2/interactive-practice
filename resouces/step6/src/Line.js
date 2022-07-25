import cSpline from 'cardinal-spline';
import { clamp } from "../../common/script/mathUtils.js";

export default class Line {
  constructor(element) {
    this.$canvas = element;
    /** @type { CanvasRenderingContext2D } */
    this.ctx = this.$canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio, 2);
    this.width = 0;
    this.height = 0;
    this.time = 0;
    this.point = { x: 0, y: 0, velocityX: 0, velocityY: 0,  }
    this.mouse = {
      x: 0, y: 0, isClicked: false, isEntered: false
    }
    /** @type { 'toUp' | 'toDown' | null } */
    this.direction = null;
    this.isPulled = true;
    this.isAnimated = false;
    this.setProperty();
    this.bind();
  }

  update(deltaTime) {
    this.time += deltaTime;
    const point = this.point;

    if(this.isPulled) {
      const halfWidth = this.width / 2;
      const halfHeight = this.height / 2;
      point.x = clamp(this.mouse.x, -halfWidth, halfWidth);
      point.y = clamp(this.mouse.y, -halfHeight, halfHeight);
    } else if (point.x !== 0 || point.y !== 0) {
      this.isAnimated = true;
      const accelerationX = -point.x * 0.1;
      const accelerationY = -point.y * 0.9;
      // point.velocityX += accelerationX;
      point.velocityY += accelerationY;
      // point.velocityX *=  0.9;
      point.velocityY *=  0.9;
      // point.x +=  point.velocityX;
      point.x += accelerationX;
      point.y +=  point.velocityY;
      if(Math.abs(point.x) < 0.001 && Math.abs(point.y) < 0.001) this.resetPosition();
    }
  }

  draw() {
    const halfWidth = this.width / 2 ;
    const halfHeight = this.height / 2 ;
    this.ctx.clearRect(-halfWidth, -halfHeight, this.width, this.height);
    this.setColor('rgba(255, 255, 255, 0.4)');
    this.setLineWidth();
    this.ctx.beginPath();
    this.ctx.moveTo(-halfWidth, 0);

    if (this.isAnimated) {
      const spline = cSpline([-halfWidth, 0, this.point.x, this.point.y, halfWidth, 0]);
      for (let i = 0; i < spline.length; i += 2) {
        this.ctx.lineTo(spline[i], spline[i + 1], 2, 0, Math.PI * 2, false);
      }
    } else {
      this.ctx.lineTo(this.point.x, this.point.y);
      this.ctx.lineTo(halfWidth, 0);
    }
    this.ctx.stroke();
  }

  setColor(color = '#fff') {
    this.ctx.strokeStyle = color;
  }

  setLineWidth(width = 1) {
    this.ctx.lineWidth = width * this.dpr;
  }

  resetPosition() {
    this.isAnimated = false;
    this.isPulled = false;
    this.point.x = 0
    this.point.y = 0
  }

  resize() {
    this.setProperty();
  }

  setProperty() {
    this.width = this.$canvas.clientWidth * this.dpr;
    this.height = this.$canvas.clientHeight * this.dpr;
    this.$canvas.width = this.width;
    this.$canvas.height = this.height;
    this.ctx.translate(this.width / 2, this.height/2);
  }

  bind() {
    window.addEventListener('mousedown', this.handleMouseDown.bind(this), { passive: true });
    window.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
    window.addEventListener('mouseup', this.handleMouseUp.bind(this), { passive: true });
    window.addEventListener('touchstart', this.handleToucheStart.bind(this), { passive: true });
    window.addEventListener('touchmove', this.handleToucheMove.bind(this), { passive: true });
    window.addEventListener('touchend', this.handleToucheEnd.bind(this), { passive: true });
  }

  handleToucheStart(e) {
    const event = e;
    event.clientX = event.touches[0].clientX
    event.clientY = event.touches[0].clientY
    this.handleMouseDown(event);
  }
  handleToucheMove(e) {
    const event = e;
    event.clientX = event.touches[0].clientX
    event.clientY = event.touches[0].clientY
    this.handleMouseMove(event);
  }

  handleToucheEnd(e) {
    this.handleMouseUp(e);
  }

  handleMouseDown(e) {
    this.mouse.isClicked = true;
    const canvasRect = this.$canvas.getBoundingClientRect()
    const canvasCenterY = canvasRect.top + canvasRect.height/2;
    const relativeMouseY = e.clientY - canvasCenterY;

    if(relativeMouseY > 0) this.direction = 'toUp'
    else if (relativeMouseY < 0) this.direction = 'toDown';
  }

  handleMouseMove(e) {
    if(!this.mouse.isClicked) return;

    const canvasRect = this.$canvas.getBoundingClientRect()
    const canvasCenterX = canvasRect.left + canvasRect.width/2;
    const canvasCenterY = canvasRect.top + canvasRect.height/2;
    const relativeMouseX = e.clientX - canvasCenterX;
    const relativeMouseY = e.clientY - canvasCenterY;
    this.mouse.x = relativeMouseX * this.dpr;
    this.mouse.y = relativeMouseY * this.dpr;

    if(this.direction === 'toDown') {
      if(relativeMouseY > 0) this.isPulled = true;
      else {
        this.isPulled = false;
        this.resetPosition();
      }
    } else if(this.direction === 'toUp') {
      if(relativeMouseY < 0) this.isPulled = true;
      else {
        this.isPulled = false;
        this.resetPosition();
      }
    }
  }

  handleMouseUp() {
    this.mouse.isClicked = false;
    this.isPulled = false;
    this.direction = null;
  }
}