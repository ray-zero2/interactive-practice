import { EventEmitter } from 'events';

export default class Pointer extends EventEmitter {
  constructor() {
    super();
    this.position = {
      x: 0,
      y: 0
    }
    this.lastPosition = {
      x: 0,
      Y: 0,
    }
    // this.resolution =  {
    //   x: 0,
    //   y: 0
    // }
    this.isTouched = false;
    this.emitOnMove = false;
    // this.touches = [];
    // this.time = 0;
  }

  bind(passives) {
    window.addEventListener('mousedown', this.mouseDown.bind(this), { passive: passives?.mousedown || false });
    window.addEventListener('mousemove', this.mouseMove.bind(this), { passive: passives?.mousemove || false });
    window.addEventListener('mouseup', this.mouseUp.bind(this), { passive: passives?.mouseup || false });
    // window.addEventListener('mousewheel', this.handleMouseWheel.bind(this));

    // window.addEventListener('touchstart', this.touchStart.bind(this), { passive: passives.touchstart || false });
    // window.addEventListener('touchmove', this.touchMove.bind(this), { passive: passives.touchmove || false });
    // window.addEventListener('touchend', this.touchEnd.bind(this), { passive: passives.touchend || false });
  }

  unbind() {
    window.removeEventListener('mousedown', this.mouseDown.bind(this));
    window.removeEventListener('mousemove', this.mouseMove.bind(this));
    window.removeEventListener('mouseup', this.mouseUp.bind(this));
    // window.removeEventListener('mousewheel', this.handleMouseWheel.bind(this));

    // window.removeEventListener('touchstart', this.touchStart.bind(this));
    // window.removeEventListener('touchmove', this.touchMove.bind(this));
    // window.removeEventListener('touchend', this.touchEnd.bind(this));
  }

  update(deltaTime) {
    this.time += deltaTime;
  }

  mouseDown(e) {
    this.isTouched = true;
    this.position = {
      x: e.clientX,
      y: e.clientY
    }
    this.emit('mousedown', e);
  }
  mouseMove(e) {
    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;
    this.position = {
      x: e.clientX,
      y: e.clientY
    }
    
    if(this.emitOnMove) this.emit('mousemove', e);
  }
  mouseUp(e) {
    this.isTouched = false;
    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;
    this.position = {
      x: 0,
      y: 0
    }
    this.emit('mouseup', e);
  }
  // handleMouseWheel(e) {

  // }

  // handleTouchStart(e) {
  //   this.isTouched = true;
  //   this.touches = e.touches;
  // }
  // handleTouchMove(e) {
  //   this.touches = e.touches;
  // }
  // handleTouchEnd(e) {
  //   if(this.touches.length === 0) this.isTouched = false;
  // }
}