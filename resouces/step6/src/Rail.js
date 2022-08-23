import gsap from 'gsap';

const DIRECTION = {
  toLeft: -1,
  toRight: 1
}

export default class Rail {
  constructor(selector) {
    this.$root = document.querySelector(selector);
    this.$wrapper = document.querySelector(selector + '__wrapper');
    this.$word = this.$root.querySelector(selector + '__word');
    this.direction = this.$root.dataset.direction !== 'reverse'
      ? DIRECTION.toLeft : DIRECTION.toRight;
    this.oneWordWidth = this.$word.clientWidth;
    this.railWidth = 0;
    this.startX = 0;
    this.translateX = 0;
    this.velocity = 0;
    this.time = 0;
    this.progress = 0;
    this.speed = 200;

  }

  init() {
    this.fillElement()
    this.setStartX();

    gsap.set(this.$wrapper, {
      x: this.startX,
      force3D: true
    })
  }

  setStartX() {
    if(this.direction === DIRECTION.toRight) {
      this.startX = window.innerWidth - this.railWidth + this.oneWordWidth;
    } else {
      this.startX = -this.oneWordWidth;
    }
  }

  fillElement() {
    this.oneWordWidth = this.$word.clientWidth;
    const windowWidth = window.innerWidth;
    const currentWordsNum = this.$wrapper.childElementCount;
    // +2した数がループしつつ画面を覆うために必要な数
    const needWordNum = Math.ceil(windowWidth / this.oneWordWidth) + 2;

    for(let i = 0; i < needWordNum - currentWordsNum; i ++) {
      const cloneNode = this.$word.cloneNode(true)
      cloneNode.setAttribute('aria-hidden', true);
      cloneNode.style.display='block';
      this.$word.parentNode.append(cloneNode);
    }
    this.railWidth = this.oneWordWidth * needWordNum;
  }

  update(deltaTime) {
    this.translateX += this.direction * deltaTime * this.speed;

    const distanceFromStartPoint = Math.abs(this.translateX - this.startX);
    if(distanceFromStartPoint > this.oneWordWidth) this.translateX = this.startX

    this.translateX = Math.round(this.translateX)
  }

  render() {
    gsap.set(this.$wrapper, {
      x: this.translateX,
      force3D: true
    })
  }

  resize(e) {
    const windowWidth = window.innerWidth;

    this.oneWordWidth = this.$word.clientWidth;
    this.setStartX();
    const currentWordsNum = this.$wrapper.childElementCount;
    const needWordNum = Math.ceil(windowWidth / this.oneWordWidth) + 2;
    const needsRefillElements = currentWordsNum < needWordNum
    if(needsRefillElements) this.fillElement()
  }

}