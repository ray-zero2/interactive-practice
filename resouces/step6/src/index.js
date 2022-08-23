import NormalizeWheel from "normalize-wheel";

import Intera from "./core/Intera"
import Line from "./Line";
import Rail from './Rail'

export default class Index extends Intera {
  constructor() {
    super();
    this.rail1 = new Rail('.js-rail1');
    this.rail2 = new Rail('.js-rail2');
    this.lines = Array.from(document.querySelectorAll('.js-line')).map(elem => new Line(elem));
    this.rail1.init();
    this.rail2.init();
    this.bind2();
    this.speed = 0
  }

  bind2() {
    window.addEventListener('mousewheel', this.handleWheel.bind(this))
    window.addEventListener('wheel', this.handleWheel.bind(this))
  }

  update() {
    const deltaTime = this.deltaTime;
    const fixedDelta = deltaTime + this.speed * 0.01;
    this.rail1.update(fixedDelta);
    this.rail2.update(fixedDelta);
    this.lines.forEach(line => line.update(deltaTime));
  }

  draw() {
    this.rail1.render();
    this.rail2.render();
    this.lines.forEach(line => line.draw());
  }

  handleResize(e) {
    this.rail1.resize(e);
    this.rail2.resize(e);
    this.lines.forEach(line => line.resize());
  }

  handleWheel(e) {
    const normalized = NormalizeWheel(e);
    this.speed = normalized.spinY
  }
}