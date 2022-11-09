import './style.scss'
import Framer from '@ray-zero2/animation-framer';

const framer = Framer.getInstance();
const $light = document.querySelector('.yurayuraLight');
const $balls = Array.from(document.querySelectorAll('.ball'));
const randoms = $balls.map(() => [Math.random(), Math.random(), Math.random()]);
const radius = Math.max(window.innerWidth * 75/1420, 30);

const update = ({time, deltaTime}) => {
  const _time = time * 2;
  $balls.forEach(($ball,index) => {
    const random = randoms[index];
    const x = radius * Math.cos(_time  * random[0] + random[2] * 10);
    const y = radius * Math.sin(_time  * random[1] + random[2] * 10);
    const scale = 1 + Math.sin(time  * random[2] + random[0] * 50) / 5;
    $ball.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})`;
    $ball.style.opacity = Math.random() <= 0.15 ? 0 : 1;
  })

  $light.style.transform = `matrix(
    ${1 + 0.1 * Math.sin(Math.random())}, 0,
     0, ${1 + 0.1 * Math.sin(Math.random())},
     ${Math.random() * 5 * 3}, ${Math.random() * 5 * 3})`;
}

const start = async () => {
  framer.add({
    id: 'balls',
    update
  })
  framer.start();
}

window.addEventListener('load', start);
