export default class Shapes {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvasSize = {
      x: 0, y: 0
    };
    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    this.mouse = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };

    /** @type { 0 | 1 | 2 } */
    this.type = 0;
    
    this.size = 80;
    this.speed = 0.1;
  }

  init() {
    this.type = Math.floor(Math.random() * 3);
    console.log(this.type);
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
    this.canvasSize.x = width;
    this.canvasSize.y = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  setMouse(position) {
    this.mouse = position;
  }

  update(deltaTime) {
    this.ctx.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y);
    this.time += deltaTime;

    const targetPosition = this.mouse;
    this.position.x += (targetPosition.x - this.position.x) * this.speed;
    this.position.y += (targetPosition.y - this.position.y) * this.speed;

    this.draw();
  }

  draw() {
    this.ctx.globalCompositeOperation = "lighter";
    switch (this.type) {
      case 0:
        this.drawCircle();
        break;
      case 1:
        this.drawRect();
        break;
      case 2:
        this.drawTriangle();
        break;
    }
  }

  drawCircle() {
    const g1 = this.ctx.createLinearGradient(
      this.position.x - this.size,
      this.position.y,
      this.position.x + this.size,
      this.position.y
    );
    g1.addColorStop(0, '#000');
    g1.addColorStop(0.5, '#f00');
    g1.addColorStop(1, '#000');
    const g2 = this.ctx.createLinearGradient(
      this.position.x ,
      this.position.y - this.size,
      this.position.x,
      this.position.y + this.size
    );
    g2.addColorStop(0, '#000');
    g2.addColorStop(0.5, '#0f0');
    g2.addColorStop(1, '#000');
    this.ctx.beginPath();
    this.ctx.fillStyle = g1;
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = g2;
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawRect() {
    const g1 = this.ctx.createLinearGradient(
      this.position.x - this.size,
      this.position.y,
      this.position.x + this.size,
      this.position.y
    );
    g1.addColorStop(0, '#a00');
    g1.addColorStop(0.1, '#000');
    g1.addColorStop(0.9, '#000');
    g1.addColorStop(1, '#a00');
    const g2 = this.ctx.createLinearGradient(
      this.position.x ,
      this.position.y - this.size,
      this.position.x,
      this.position.y + this.size
    );
    g2.addColorStop(0, '#0a0');
    g2.addColorStop(0.1, '#000');
    g2.addColorStop(0.9, '#000');
    g2.addColorStop(1, '#0a0');
    this.ctx.beginPath();
    this.ctx.fillStyle = g1;
    this.ctx.rect(
      this.position.x - this.size,
      this.position.y - this.size,
      this.size * 2,
      this.size * 2,
      );
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = g2;
    this.ctx.rect(
      this.position.x - this.size,
      this.position.y - this.size,
      this.size * 2,
      this.size * 2,
    );
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawTriangle() {
    const g1 = this.ctx.createLinearGradient(
      this.position.x - this.size,
      this.position.y,
      this.position.x + this.size,
      this.position.y
    );
    g1.addColorStop(0, '#000');
    g1.addColorStop(0.5, '#a00');
    g1.addColorStop(1, '#000');
    const g2 = this.ctx.createLinearGradient(
      this.position.x ,
      this.position.y - this.size,
      this.position.x,
      this.position.y + this.size
    );
    g2.addColorStop(0, '#000');
    g2.addColorStop(0.5, '#0a0');
    g2.addColorStop(1, '#000');

    this.ctx.beginPath();
    this.ctx.fillStyle = g1;
    this.ctx.moveTo(
      this.position.x,
      this.position.y - this.size
    );
    this.ctx.lineTo(
      this.position.x + this.size * Math.cos(Math.PI / 6),
      this.position.y + this.size * Math.sin(Math.PI / 6),
    );
    this.ctx.lineTo(
      this.position.x + this.size * Math.cos(Math.PI *  5 / 6),
      this.position.y + this.size * Math.sin(Math.PI *  5 / 6),
    );
    this.ctx.lineTo(
      this.position.x,
      this.position.y - this.size
    );
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = g2;
    this.ctx.moveTo(
      this.position.x,
      this.position.y - this.size
    );
    this.ctx.lineTo(
      this.position.x + this.size * Math.cos(Math.PI / 6),
      this.position.y + this.size * Math.sin(Math.PI / 6),
    );
    this.ctx.lineTo(
      this.position.x + this.size * Math.cos(Math.PI *  5 / 6),
      this.position.y + this.size * Math.sin(Math.PI *  5 / 6),
    );
    this.ctx.lineTo(
      this.position.x,
      this.position.y - this.size
    );
    this.ctx.closePath();
    this.ctx.fill();
  }
}