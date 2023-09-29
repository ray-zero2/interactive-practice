const ACTIVE_CLASS_NAMES = {
  primary: 'active-primary',
  secondary: 'active-secondary',
} as const;

export default class Letter {
  letter: HTMLElement;
  constructor(letter: HTMLElement) {
    this.letter = letter;
  }

  matches(testWord: string) {
    return this.letter.textContent === testWord;
  }

  activate(order: keyof typeof ACTIVE_CLASS_NAMES) {
    this.letter.classList.add(ACTIVE_CLASS_NAMES[order]);
  }

  inactivate() {
    this.letter.classList.remove(ACTIVE_CLASS_NAMES.primary);
    this.letter.classList.remove(ACTIVE_CLASS_NAMES.secondary);
  }

  isActive() {
    return this.letter.classList.contains(ACTIVE_CLASS_NAMES.primary) || this.letter.classList.contains(ACTIVE_CLASS_NAMES.secondary);
  }
}
