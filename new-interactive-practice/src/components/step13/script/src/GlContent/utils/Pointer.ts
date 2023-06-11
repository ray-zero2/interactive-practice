import { Vector2 } from "three";
import EventEmitter from 'events';

type Target = HTMLElement | Window;
export default class Pointer extends EventEmitter {

  public position: THREE.Vector2 = new Vector2( 0, 0 );
  public delta: THREE.Vector2 = new Vector2( 0, 0 );
  public isTouching: boolean = false;
  protected resolution: THREE.Vector2 = new Vector2( 0, 0 );
  protected target: Target;
  protected resizeObserver?: ResizeObserver;


  constructor(target: Target = window) {
    super();
    this.target = target;
    this.bind();
  }

  public bind() {
    (this.target as Window).addEventListener('mousedown', this.handleMouseDown.bind(this));
    (this.target as Window).addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
    (this.target as Window).addEventListener('mouseup', this.handleMouseUp.bind(this), { passive: true });
    // this.target.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    // this.target.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
    // this.target.addEventListener('touchend',  this.handleTouchEnd.bind(this), { passive: true });
    this.target.addEventListener('wheel', this.handleWheel.bind(this), { passive: true });
    if(this.target instanceof Element) {
      this.resizeObserver = new ResizeObserver(this.handleResizeElement.bind(this))
      this.resizeObserver.observe(this.target)
    } else {
      window.addEventListener('resize', this.handleResizeWindow.bind(this)), { passive: true }
    };
  }

  public unbind() {
    (this.target as Window).removeEventListener('mousedown', this.handleMouseDown.bind(this));
    (this.target as Window).removeEventListener('mousemove', this.handleMouseMove.bind(this));
    (this.target as Window).removeEventListener('mouseup', this.handleMouseUp.bind(this));
    // this.target.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    // this.target.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    // this.target.removeEventListener('touchend',  this.handleTouchEnd.bind(this));
    this.target.removeEventListener('wheel', this.handleWheel.bind(this));
    if(this.resizeObserver) {
      this.resizeObserver.disconnect() ;
    } else {
      window.removeEventListener('resize', this.handleResizeWindow.bind(this));
    };
  }

  public getScreenPosition( windowSize: THREE.Vector2 ) {
    if ( this.position.x != this.position.x ) return new Vector2( NaN, NaN );
    const p = this.position.clone()
      .divide( windowSize )
      .multiplyScalar( 2.0 )
      .subScalar( 1.0 );
    p.y *= -1;
    return p;
  }

  public getRelativePosition( elm: HTMLElement, screen ? : boolean ) {
    const rect: DOMRect = elm.getClientRects()[ 0 ] as DOMRect;
    let x = this.position.x - rect.left;
    let y = this.position.y - rect.top;
    if ( screen ) {
      x /= rect.width;
      y /= rect.height;
    }
    const p = new Vector2( x, y );
    return p;
  }

  protected handleMouseDown(e: MouseEvent) {
    this.isTouching = true;
    this.position.set(e.offsetX, e.offsetY);
    this.delta.set(0, 0);
    this.emit('update', {
      event: e,
      eventType: 'mousedown',
      position: this.position.clone(),
      normalizedPosition: this.position.clone(),
      delta: this.delta.clone(),
      isTouching: this.isTouching
    });
  }
  protected handleMouseMove(e: MouseEvent) {
    const positionX = e.offsetX;
    const positionY = e.offsetY;
    this.delta.set(positionX - this.position.x, positionY - this.position.y);
    this.position.set(positionX, positionY);
    this.emit('update', {
      event: e,
      eventType: 'mousemove',
      position: this.position.clone(),
      normalizedPosition: this.position.clone(),
      delta: this.delta.clone(),
      isTouching: this.isTouching
    });
  }
  protected handleMouseUp(e: MouseEvent) {
    this.isTouching = false;
    this.position.set(e.offsetX, e.offsetY);
    this.delta.set(0, 0);
    this.emit('update', {
      event: e,
      eventType: 'mouseup',
      position: this.position.clone(),
      normalizedPosition: this.position.clone(),
      delta: this.delta.clone(),
      isTouching: this.isTouching
    });
  }
  // protected handleTouchStart(e: Event) { console.log(e); }
  // protected handleTouchMove(e: Event) { console.log(e); }
  // protected handleTouchEnd(e: Event) { console.log(e); }
  protected handleWheel(e: Event) { console.log(e); }
  protected handleResizeWindow(e: Event) {
    this.resolution.set(window.innerWidth, window.innerHeight);
    console.log(this.resolution.x, this.resolution.y);
  }

  protected handleResizeElement(entries: ResizeObserverEntry[], observer: ResizeObserver) { 
    const entry = entries[0];
    this.resolution.set(entry.contentRect.width, entry.contentRect.height);
    console.log(this.resolution.x, this.resolution.y);
  }
}