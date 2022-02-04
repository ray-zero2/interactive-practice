import Stalker from './src/Stalker';
import Intera from './src/core/Intera';
import './style.scss'

const STALKERS_NUM = 20;
class Intera1 extends Intera {

  constructor() {
    super();

    this.stalkers = [];
    this.init();
  }

  init() {
    for(let i = 0; i < STALKERS_NUM; i++) {
      this.stalkers.push(new Stalker(i));
    };

    this.stalkers.forEach((stalker, index) => {
      stalker.init();
      if(index >= 1) {
        const prevStalker = this.stalkers[index - 1];
        stalker.setTarget(prevStalker.position);
      } else {
        stalker.setTarget(this.mouse.position);
      }
    })
  }

  update() {
    this.stalkers.forEach(stalker => {
      stalker.update(this.deltaTime);
    })
  }

  draw() {
    this.stalkers.forEach(stalker => {
      stalker.draw();
    })
  }

  handleMouseDown(e) {
    super.handleMouseDown(e);
    this.setMouseFlagToStalkers();
  }

  handleMouseMove(e) {
    if(!this.mouse.isDown) return;
    super.handleMouseMove(e);
  }

  handleMouseUp(e) {
    super.handleMouseUp(e);
    this.setMouseFlagToStalkers();
  }

  setMouseFlagToStalkers() {
    this.stalkers.forEach(stalker => {
      stalker.setMouseDown(this.mouse.isDown);
    })
  }
}

const intera = new Intera1();
intera.start();