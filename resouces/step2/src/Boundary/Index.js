import Lines from "./Lines";
import Mixer from "./Mixer";
import Shapes from "./Shapes";

export default class Boundary {
  constructor(selector = ".js-canvas") {
    this.canvas = document.querySelector(selector);
    this.time = 0;
    this.lines = new Lines();
    this.shapes = new Shapes();
    this.mixer = new Mixer(this.canvas);
    this.mouse = { x: 0, y: 0 };
  }

  init() {
    this.setCanvasSize();
    this.lines.setLineWidth(0.5);
    this.shapes.init();
    this.shapes.setMouse(this.mouse);
    this.bind();
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.lines.update(deltaTime);
    this.shapes.update(deltaTime);

    const texture1 = this.lines.getImage();
    this.mixer.setTextureImage(texture1, 0);

    const texture2 = this.shapes.getImage();
    this.mixer.setTextureImage(texture2, 1);

    this.mixer.update(deltaTime);
  }

  draw() {
    this.mixer.draw();
  }

  setCanvasSize() {
    const { width, height } = this.canvas;
    this.lines.setSize(width, height);
    this.shapes.setSize(width, height);
    this.mixer.setSize(width, height);
  }

  handleMouseMove(e) {
    const { offsetX, offsetY, target  } = e;
    const x = offsetX / target.clientWidth * target.width;
    const y = offsetY / target.clientHeight * target.height;

    this.mouse.x = x;
    this.mouse.y = y;
  }

  bind() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }
}