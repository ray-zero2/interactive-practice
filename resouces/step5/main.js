
import Hover from "./src/Hover";
import velocity from 'velocity-animate';
import './style.scss'

class Intera5 {
  constructor() {
    const elements = Array.from(document.querySelectorAll('.js-hover'));
    const hovers = elements.map(element =>  new Hover(element, {
      rollOut: this.handleRollOut,
      rollOver: this.handleRollOver,
      // oneShot: false,
      // className:{
      //   hover: 'isHover',
      //   playing: 'isPlaying'
      // }
    }))
  }

  handleRollOver(element) {
    velocity(element, 'stop');
    return velocity(element,{ tween: [1 , 0] },{
      duration: 700,
      progress: (elements, complete, remaining, start, tweenValue) => {
        element.style.setProperty('--progress', tweenValue);
      },
      easing: [0.43, 0.05, 0.17, 1]
    });
  }

  handleRollOut(element) {
    velocity(element, 'stop');
    return velocity(element,{ tween: [0 , 1] },{
      duration: 400,
      progress: (elements, complete, remaining, start, tweenValue) => {
        element.style.setProperty('--progress', tweenValue);
      },
      easing: [0.43, 0.05, 0.17, 1]
    });
  }
}

const intera = new Intera5();