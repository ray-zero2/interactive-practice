export default class Stalker {
  constructor() {
    this.element = null;
    this.time = 0;
    this.position = {
      x: 0,
      y: 0
    }
    this.size = {
      x: 20,
      y: 20
    }
    this.length = 0;
    this.target = {
      position: {x: 0, y: 0}
    }
  }

  /**
   *
   * @param { { x: number, y: number } } position
   */
  setTarget(position) {
    this.target.position = position;
  }

  update(deltaTime) {
    this.time += deltaTime;
    
    const targetPosition = this.target.position;
    this.position.x += (targetPosition.x - this.position.x) * 0.2;
    this.position.y += (targetPosition.y - this.position.y) * 0.2;
    this.length = Math.hypot(
      targetPosition.x - this.position.x,
      targetPosition.y - this.position.y
    );
  }

  draw() {
    const positionX = this.position.x - this.size.x/2;
    const positionY = this.position.y - this.size.y/2;
    const scale = Math.max(1, this.length * 0.1);
    this.element.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${positionX}, ${positionY})`;
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('stalker');
    this.element.style.width = `${this.size.x}px`;
    this.element.style.height = `${this.size.y}px`;
    document.querySelector('.mv').append(this.element);
  }
}