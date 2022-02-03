import Stalker from './src/Stalker';
import './style.scss'

let mouseDown = false;
let lastTimeStamp = null;
let time = 0;

const STALKER_NUM = 20;
const stalkers = [];

for(let i = 0; i < STALKER_NUM; i++) {
  stalkers.push(new Stalker());
}

const mouse = {
  x: 0,
  y: 0
};

const update = () => {
  stalkers.forEach(stalker => {
    stalker.update();
  })
}

const handleMouseDown = (e) => {
  mouseDown = true;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  update();
};

const handleMouseUp = () => {
  mouseDown = false;
};

const handleMouseMove = (e) => {
  if(!mouseDown) return;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  update();
}

const draw = () => {
  stalkers.forEach(stalker => {
    stalker.draw();
  })
  // console.log('test');
}

const animate = (timeStamp) => {
  requestAnimationFrame(animate);
  const deltaTime = (timeStamp - lastTimeStamp) / 1000 || 0;
  time += deltaTime
  // console.log(time);
  update();
  draw();
  lastTimeStamp = timeStamp;
}

const bind = () => {
  window.addEventListener('mousedown', handleMouseDown, { passive: false });
  window.addEventListener('mousemove', handleMouseMove, { passive: false });
  window.addEventListener('mouseup', handleMouseUp, { passive: false });
}

const initStalkers = () => {
  stalkers.forEach((stalker, index) => {
    stalker.init();
    if(index >= 1) {
      const prevStalker = stalkers[index - 1];
      stalker.setTarget(prevStalker.position);
    } else {
      stalker.setTarget(mouse);
    }
  })
}

const init = () => {
  initStalkers();
  bind();
  animate();
}

init();