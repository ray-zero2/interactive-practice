import EventEmitter from 'eventemitter3';


const INTERVAL_TIMES = {
  minutes: 60 * 1000,
  second: 1000,
} as const;

const CLOCK_FACE_WORDS = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"] as const;

type Unit = keyof typeof INTERVAL_TIMES;

export function convert24HourTo12HourInWords(hour: number) {
  const hourIn12HourFormat = Math.floor(hour) % 12;
  return CLOCK_FACE_WORDS[hourIn12HourFormat];
}

export function convertMinutesToClockFaceWords(minutes: number) {
  const _minutes = minutes % 60;
  const minuteIn5MinuteFormat = Math.floor(_minutes / 5);
  return CLOCK_FACE_WORDS[minuteIn5MinuteFormat];
}


export default class ClockEvent extends EventEmitter {
  unit: Unit;
  intervalId: number;
  constructor(unit: Unit = 'second', autoStart = true) {
    super();
    this.unit = unit;
    this.intervalId = NaN;
    if(autoStart) this.start();
  }

  start() {
    if(!Number.isNaN(this.intervalId)) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.emit('tick', new Date());
    }, INTERVAL_TIMES[this.unit]);
  }

  stop() {
    if(!Number.isNaN(this.intervalId)) {
      clearInterval(this.intervalId);
      this.intervalId = NaN;
    }
  }
}


