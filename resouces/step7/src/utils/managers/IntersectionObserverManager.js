export default class IntersectionObserverManager {
  static instance = null;
  static getInstance() {
    if(!IntersectionObserverManager.instance) instance = new IntersectionObserverManager()
    return IntersectionObserverManager.instance;
  }

  constructor(intersectionObserverInit) {
    this.observer = new IntersectionObserver(this.observerCallback.bind(this), intersectionObserverInit);
    this.observedList = [];
  }

  observe({id, element, callback}) {
    element['observerOptions'].id = id;
    element['observerOptions'].callback = callback;
    this.observer.observe(element);
    this.observedList.push({id, element});
  }

  unobserve(id) {
  }

  observerCallback() {

  }
}