const ACTIVE_CLASS_NAMES = {
  primary: 'active-primary',
  secondary: 'active-secondary',
} as const;

export default class Letter {
  letter: HTMLElement;
  isActive: boolean;
  rect: DOMRect;
  parent: HTMLElement;
  parentRect: DOMRect;
  constructor(letter: HTMLElement) {
    this.letter = letter;
    this.rect = this.letter.getBoundingClientRect();
    this.parent = this.letter.parentElement!;
    this.parentRect = this.parent.getBoundingClientRect();
    this.isActive = false;

    this.letter.style.setProperty('--delay', `${Math.random() * 4 + 1}s`);
  }

  matches(testWord: string) {
    return this.letter.textContent === testWord;
  }

  getText() {
    const text = this.letter.textContent;
    return text || '';
  }

  activate(order: keyof typeof ACTIVE_CLASS_NAMES) {
    this.isActive = true;
    this.letter.classList.add(ACTIVE_CLASS_NAMES[order]);
  }

  inactivate() {
    this.isActive = false;
    this.letter.classList.remove(ACTIVE_CLASS_NAMES.primary);
    this.letter.classList.remove(ACTIVE_CLASS_NAMES.secondary);
  }

  delete() {
    this.letter.remove();
  }

  isVisible() {
    return (
      this.rect.bottom <= this.parentRect.bottom
    )
  }

  handleIntersection(entries: IntersectionObserverEntry[]) {
  }

  observe() {
  }

  unobserve() {
  }
}
