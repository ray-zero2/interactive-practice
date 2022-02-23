export default class Stalker {
  constructor(id) {
    this.element = null;
    this.id = id;
    this.time = 0;
    this.isMouseDown = false;
    this.opacity = 1;
    this.position = { x: 0, y: 0 };
    this.size = { x: 20, y: 20 };
    this.target = {
      position: { x: 0, y: 0 },
      distance: 0
    }
    // this.random = Math.random();
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

  update(deltaTime) {
    this.time += deltaTime;

    const targetPosition = this.target.position;
    const distance = Math.hypot(
      targetPosition.x - this.position.x,
      targetPosition.y - this.position.y
    );

    if(this.isMouseDown) {
      this.opacity =  Math.min(this.opacity + deltaTime*5, 1);
    }
    else {
      this.opacity = Math.max(this.opacity - deltaTime*1.5, 0);
    }


    let speed = 0.2;
    if(!this.isMouseDown) speed = 0.5;
    else if(distance <= 2) speed = 0.1;

    this.position.x += (targetPosition.x - this.position.x) * speed;
    this.position.y += (targetPosition.y - this.position.y) * speed;

    this.target.distance = distance;
  }

  draw() {
    const positionX = this.position.x - this.size.x/2;
    const positionY = this.position.y - this.size.y/2;
    const scale = Math.max(1, this.target.distance * 0.02);
    this.element.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${positionX}, ${positionY})`;
    this.element.style.opacity = this.opacity;
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('stalker');
    this.element.style.width = `${this.size.x}px`;
    this.element.style.height = `${this.size.y}px`;
    document.querySelector('.mv').append(this.element);
  }
}