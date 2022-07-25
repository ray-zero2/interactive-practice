export default class Intera {
  constructor() {
    this.mouse = {
      position: { x: 0, y: 0 },
      isDown: false
    };
    this.time = 0;
    this.deltaTime = 0;
    this.lastTimeStamp = 0;
    this.bind();
  }

  start() {
    this.animate();
  }

  update() {}

  draw() {}

  handleMouseDown(e) {
    this.mouse.isDown = true;
    this.mouse.position.x = e.clientX;
    this.mouse.position.y = e.clientY;
  }

  handleMouseMove(e) {
    this.mouse.position.x = e.clientX;
    this.mouse.position.y = e.clientY;
  }

  handleMouseUp(e) {
    this.mouse.isDown = false;
    this.mouse.position.x = e.clientX;
    this.mouse.position.y = e.clientY;
  }

  handleResize(e) {}

  animate(timeStamp) {
    requestAnimationFrame(this.animate.bind(this));
    this.deltaTime = (timeStamp - this.lastTimeStamp) / 1000 || 0;
    this.time += this.deltaTime
    this.update();
    this.draw();
    this.lastTimeStamp = timeStamp;
  }

  bind() {
    window.addEventListener('mousedown', this.handleMouseDown.bind(this), { passive: false });
    window.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: false });
    window.addEventListener('mouseup', this.handleMouseUp.bind(this), { passive: false });
    window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
  }
}