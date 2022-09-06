export default class Intersect {
  constructor(selector) {
    this.$roots = Array.from(document.querySelectorAll(selector));
    this.observer = null;

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: 0
    })
    this.observe();
  }

  observe() {
    this.$roots.forEach($elem => {
      this.observer.observe($elem)
    })
  }

  unobserve() {
    this.$roots.forEach($elem => {
      this.observer.unobserve($elem)
    })
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      const {target, isIntersecting} = entry;
      target.dataset.intersect = isIntersecting
    });
  }
}