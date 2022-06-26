const CLASS_NAME = {
  HOVER: 'is-hover',
  PLAYING: 'is-playing'
}

export default class Hover {
  /**
   * @param { {
   * oneShot?: boolean;
   * rollOver: (target: HTMLElement) => Promise<void>;
   * rollOut: (target: HTMLElement) => Promise<void>;
   * className?: {
   * hover?: string;
   * playing?: string
   *  }
   * } } options
   */
  constructor(element, options) {
    this.element = element// document.querySelector(selector);
    this.isPlaying = false;
    this.isOver = false;

    this.isOneShot = options?.oneShot === undefined ? true : options?.oneShot;

    this.hoverClassName = options?.className?.hover || CLASS_NAME.HOVER
    this.playingClassName = options?.className?.playing || CLASS_NAME.PLAYING

    /** @type {(target: HTMLElement) => Promise<void> } */
    this.rollOverFunc = options.rollOver

    /** @type {(target: HTMLElement) => Promise<void> } */
    this.rollOutFunc = options.rollOut

    this.init();
  }

  init() {
    this.bind()
  }

  bind() {
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this), { passive: true });
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this), { passive: true });
  }

  unbind() {
    this.element.removeEventListener('mouseenter', this.handleMouseEnter.bind(this), { passive: true });
    this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this), { passive: true });
  }

  /** @protected */
  async rollOver() {
    this.isPlaying = true;
    this.element.classList.add(this.playingClassName)
    await this.rollOverFunc(this.element);
    this.element.classList.remove(this.playingClassName)
    this.isPlaying = false

    if(!this.isOver && this.isOneShot) this.rollOut();
  }

  /** @protected */
  async rollOut() {
    this.isPlaying = true;
    this.element.classList.add(this.playingClassName)
    await this.rollOutFunc(this.element);
    this.element.classList.remove(this.playingClassName)
    this.isPlaying = false

    if(this.isOver && this.isOneShot) this.rollOver();
  }

  /** @protected */
  handleMouseEnter() {
    this.isOver = true;
    this.element.classList.add(this.hoverClassName)
    if(!this.isOneShot || !this.isPlaying) this.rollOver();
  }

  /** @protected */
  handleMouseLeave() {
    this.isOver = false;
    this.element.classList.remove(this.hoverClassName)
    if(!this.isOneShot || !this.isPlaying) this.rollOut();
  }
}