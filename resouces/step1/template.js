import Intera from './src/core/Intera';

class Template extends Intera {
  constructor() {
    super();

    this.init();
  }

  init() {}

  update() {}

  draw() {}

  handleMouseDown(e) {
    super.handleMouseDown(e);
  }

  handleMouseMove(e) {
    if(!this.mouse.isDown) return;
    super.handleMouseMove(e);
  }

  handleMouseUp(e) {
    super.handleMouseUp(e);
  }
}

const animation = new Template();
animation.start();