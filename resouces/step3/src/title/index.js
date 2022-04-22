import velocity from 'velocity-animate';
import Char from './Char';
import { EASING } from './const';
import { mouse } from './Mouse';

const COLORS = ['red', 'green', 'blue'];

export default class Title {
  constructor(selector) {
    this.root = document.querySelector(selector);
    this.original = null;
    this.chars = [];
    this.mouse = mouse;
    // this.time = 0;
    // this.deltaTime = 0;
    // this.lastTimeStamp = 0;
    this.progress = 0.001;
    this.init();
  }


  init() {
    this.original = this.surroundSpan();
    this.root.innerHTML = '';
    this.root.append(this.original);
    this.root.style.position = 'relative';
    this.original.style.position = 'relative';
    this.original.style.zIndex = COLORS.length;

    const elements = COLORS.map((color, index) => {
      const elem = this.original.cloneNode(true);
      elem.classList.add(color, 'cloned');
      elem.setAttribute('aria-hidden', true);
      const style = elem.style;
      style.color = color;
      style.position = 'absolute';
      style.top = 0;
      style.left = 0;
      style.zIndex = ( COLORS.length - 1 ) - index;
      style.pointerEvents = 'none';
      style.userSelect = 'none';
      style.whiteSpace = 'nowrap';
      return elem;
    })

    elements.forEach(element => {
      this.root.append(element)
    })

    this.chars = elements.flatMap((element, index) => {
      const charArr = Array.from(element.childNodes).map((charElement , charIndex) => {
        return new Char(charElement, index, charIndex);
      });
      return charArr;
    });

    this.chars.forEach(char => {
      char.setTarget(this.mouse.position);
    })
  }

  async start() {
    await velocity(this.original,{
      tween: [1, this.progress]
    },{
      duration: 300,
      easing: EASING,
      begin: () => {
        this.animate();
      },
      progress: (elements, complete, remaining, start, tweenValue) => {
        this.progress = tweenValue;
      }
    });
    await velocity(this.original,{
      tween: [0, 1]
    },{
      duration: 600,
      easing: EASING,
      progress: (elements, complete, remaining, start, tweenValue) => {
        this.progress = tweenValue;
      }
    });
  }

  animate(timeStamp) {
    requestAnimationFrame(this.animate.bind(this));
    // this.deltaTime = (timeStamp - this.lastTimeStamp) / 1000 || 0;
    // this.time += this.deltaTime
    this.update();
    // this.lastTimeStamp = timeStamp;
  }

  update() {
    this.chars.forEach(char => {
      char.setTarget(this.mouse.position);
      char.update(this.progress);
      char.draw();
    })
  }

  surroundSpan() {
    const span = document.createElement('span');
    const fragment = document.createDocumentFragment();
    const text = this.root.innerText;
    const textArray = text.split('');
    textArray.forEach(char => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.innerText = char;
      fragment.append(span);
    })
    span.append(fragment);
    return span;
  }

}