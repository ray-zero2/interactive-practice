class Mouse {
  constructor(id) {
    this.position = { x: 0, y: 0 };
    this.bind();
  }

  bind() {
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  unbind() {
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  calcNormalizedPosition(e) {
    const { clientX, clientY } = e;
    const fromCenterX = clientX / (window.innerWidth/2) -  1;
    const fromCenterY = clientY / (window.innerHeight/2) -  1;
    return {x : fromCenterX, y: fromCenterY};
  }

  handleMouseMove(e) {
    const normalizedPosition = this.calcNormalizedPosition(e);
    this.position = normalizedPosition;
  }
}

export const mouse = new Mouse();