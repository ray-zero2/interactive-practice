const CLASS_NAME = {
  isHidden: 'is-hidden'
}

export default class Loading {
  constructor(selector) {
    this.$root = document.querySelector(selector);
    this.init();
  }

  init() {
    this.show();
  }

  show() {
    this.$root.classList.remove(CLASS_NAME.isHidden);
  }

  hide() {
    // this.$root.classList.add(CLASS_NAME.isHidden);
    this.$root.style.display = 'none';
  }
}