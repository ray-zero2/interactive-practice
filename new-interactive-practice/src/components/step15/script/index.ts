import ClockEvent, { convert24HourTo12HourInWords, convertMinutesToClockFaceWords } from "./ClockEvent";
import Letter from "./Letter";
import { WORDS } from "./const";
import { fisherYatesShuffle } from './utils';

const clock = new ClockEvent('second');

function createWordList() {
  const words = fisherYatesShuffle(fisherYatesShuffle(WORDS));
  words.length = 50;
  return words.map(word => `${word}`).join(' ');
}


function init() {
  const wordListWrapper = document.querySelector<HTMLElement>('.js-words');
  if(!wordListWrapper) throw new Error('wordListWrapper is not found');
  wordListWrapper.innerHTML = '';
  const wordList = createWordList();

  wordListWrapper.innerHTML = wordList.split('').map(letter => `<span>${letter}</span>`).join('');
  const letters = Array.from(wordListWrapper.querySelectorAll<HTMLElement>('span')).map(letter => new Letter(letter));

  // initialize board ///
    letters.forEach(letter => {
      if(!letter.isVisible()) {
        letter.delete();
      }
    })
  const shownLetters = letters.filter(letter => letter.isVisible());
  const lastLetter = shownLetters[shownLetters.length - 1];
  lastLetter.delete();
  /////

  let lastHour = '';
  let lastMinute = '';
  function tick(data: Date) {
    const hour = convert24HourTo12HourInWords(data.getHours());
    const minute = convertMinutesToClockFaceWords(data.getMinutes());
    if(lastHour === hour && lastMinute === minute) return;

    shownLetters.forEach(letter => letter.inactivate());


    ///
    const hourLetters = hour.split('');
    const minuteLetters = minute.split('');

    const matchesLetters: { letter: Letter, index: number }[] = [];
    shownLetters.forEach((letter, index) => {
      const text = letter.getText();
      if(
          !letter.isActive &&
          (hourLetters.includes(text) || minuteLetters.includes(text))
        ) {
        matchesLetters.push({ letter, index });
      }
    });

    if(matchesLetters.length < (hourLetters.length + minuteLetters.length)) {
      location.reload();
      return;
    }

    /// search  ///
    hourLetters.forEach((hourLetter) => {
      const matchArrays = matchesLetters.filter(({ letter }) => !letter.isActive && (letter.getText() === hourLetter));
      const randomIndex = Math.floor(Math.random() * matchArrays.length);
      const match = matchArrays[randomIndex];
      match.letter.activate('primary');
    });

    minuteLetters.forEach((minuteLetter) => {
      const matchArrays = matchesLetters.filter(({ letter }) => !letter.isActive && (letter.getText() === minuteLetter));
      if(matchArrays.length === 0) location.reload();
      const randomIndex = Math.floor(Math.random() * matchArrays.length);
      const match = matchArrays[randomIndex];
      match.letter.activate('secondary');
    });


    lastHour = hour;
    lastMinute = minute;
  }

  tick(new Date());
  clock.on('tick', tick);
}

init();
