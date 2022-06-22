
import Hover from "./src/Hover";
import velocity from 'velocity-animate';
import './style.scss'

class Intera5 {
  constructor() {
    new Hover('.js-hover', {
      rollOut: this.rollOut,
      rollOver: this.rollOver,
      // oneShot: false,
      // className:{
      //   hover: 'isHover',
      //   playing: 'isPlaying'
      // }
    });
  }

  rollOver(element) {
    velocity(element, 'stop');
    return velocity(element,{ translateX: ['200px', ] },{
      duration: 800
    });
  }

  rollOut(element) {
    velocity(element, 'stop');
    return velocity(element,{ translateX: ['0px', ]},{
      duration: 800
    });
  }
}

const intera = new Intera5();