import ClockEvent, { convert24HourTo12HourInWords, convertMinutesToClockFaceWords } from "./ClockEvent";
import Letter from "./Letter";
import { WORDS } from "./const";
import { fisherYatesShuffle } from './utils';

function createWordList() {
  const words = fisherYatesShuffle(fisherYatesShuffle(WORDS));
  return words.map(word => `${word}`).join(' ');
}


function init() {
  const wordListWrapper = document.querySelector<HTMLElement>('.js-words');
  if(!wordListWrapper) throw new Error('wordListWrapper is not found');
  const wordList = createWordList();

  wordListWrapper.innerHTML = wordList.split('').map(letter => `<span>${letter}</span>`).join('');

  const letters = Array.from(wordListWrapper.querySelectorAll<HTMLElement>('span')).map(letter => new Letter(letter));

  const clock = new ClockEvent('second');
  function activate() {
    letters.forEach(letter => letter.inactivate());
  }

  clock.on('tick', (date) => {
    const hour = convert24HourTo12HourInWords(date.getHours());
    const minute = convertMinutesToClockFaceWords(date.getMinutes());

    activate();
    letters.find(letter => letter.matches(hour))?.activate('primary');
    letters.find(letter => letter.matches(minute))?.activate('secondary');
  });
}

class Letter {
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

init();
