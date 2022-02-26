import Stalker from './src/Stalker';
import Intera from './src/core/Intera';
import './style.scss'
import Square from './src/Square';
import { lerp } from './src/mathUtils';

const squares_NUM = 15;
const STALKERS_NUM = 20;
class Intera1 extends Intera {

  constructor() {
    super();

    this.windowSize = {
      x: window.innerWidth,
      y: window.innerHeight
    }
    this.stalkers = [];
    this.squares = [];
    this.init();
  }

  init() {
    for(let i = 0; i < squares_NUM; i++) {
      this.squares.push(new Square(i));
    };
    for(let i = 0; i < STALKERS_NUM; i++) {
      this.stalkers.push(new Stalker(i));
    };

    this.squares.forEach((square, index) => {
      const maxSpeed = 0.3;
      const minSpeed = 0.1
      square.setWindowSize(this.windowSize.x, this.windowSize.y);
      square.setSpeed(lerp(index, 0, squares_NUM, maxSpeed, minSpeed));
      square.setTarget(this.mouse.position);

      if(index >= 1) {
        const prevSquare = this.squares[index - 1];
        const prevSize = prevSquare.size;
        square.setSize(prevSize.x, prevSize.y);

      } else {
        square.setSize(this.windowSize.x, this.windowSize.y);
      }

      square.init();
    })

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
    this.squares.forEach((square) => {
      square.update(this.deltaTime);
    })
  }

  draw() {
    this.stalkers.forEach(stalker => {
      stalker.draw();
    })
    this.squares.forEach((square) => {
      square.draw();
    })
  }

  handleMouseDown(e) {
    super.handleMouseDown(e);
    this.setMouseFlag();
  }

  handleMouseMove(e) {
    if(!this.mouse.isDown) return;
    super.handleMouseMove(e);
  }

  handleMouseUp(e) {
    super.handleMouseUp(e);
    this.setMouseFlag();
  }

  handleResize(e) {
    this.windowSize = {
      x: window.innerWidth,
      y: window.innerHeight
    }
    this.squares.forEach((square, index) => {
      square.setWindowSize(this.windowSize.x, this.windowSize.y);

      if(index === 0) {
        square.setSize(this.windowSize.x, this.windowSize.y);
      } else {
        const prevSquare = this.squares[index - 1];
        const prevSize = prevSquare.size;
        square.setSize(prevSize.x, prevSize.y);
      }

      square.styleElement();
    })
  }

  setMouseFlag() {
    this.stalkers.forEach(stalker => {
      stalker.setMouseDown(this.mouse.isDown);
    })
    this.squares.forEach(square => {
      square.setMouseDown(this.mouse.isDown);
    })
  }

  handleTouchStart(e) {
    e.preventDefault();
    this.mouse.isDown = true;
    this.mouse.position.x = e.touches[0].pageX;
    this.mouse.position.y = e.touches[0].pageY;
    this.setMouseFlag();
  }
  handleTouchMove(e) {
    e.preventDefault();
    this.mouse.position.x = e.touches[0].pageX;
    this.mouse.position.y = e.touches[0].pageY;
  }
  handleTouchEnd(e) {
    e.preventDefault();
    this.mouse.isDown = false;
    this.setMouseFlag()
  }

  bind() {
    super.bind();
    window.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
  }
}

const intera = new Intera1();
intera.start();