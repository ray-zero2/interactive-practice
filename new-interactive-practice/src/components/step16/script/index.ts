import { MusicPlayer } from '@src/components/step16/script/src/MusicPlayer/MusicPlayer';
import GlContent from './src/GlContent/index';
import gsap from 'gsap';

const modal = document.querySelector('.js-modal')!;
const startButton = document.querySelector('.js-button[data-type="start"]')!;

const playButton = document.querySelector('.js-button[data-type="play"]')!;
const stopButton = document.querySelector('.js-button[data-type="stop"]')!;
const volume = document.querySelector('.js-volume')!;


let content: GlContent | null = null;
let player: MusicPlayer | null = null;

const setVolume = (volume: number) => {
  if(player !== null) player.setVolume(volume);
}

window.addEventListener('load', () => {
  content = new GlContent(document.querySelector('.canvas')!);
})

startButton!.addEventListener('click', () => {
  player = new MusicPlayer(40, 72.5);

  const volumeValue = parseInt((volume as HTMLInputElement).value, 10);
  const normalizedVolume = Math.max(Math.min(100, volumeValue),0) / 100;
  setVolume(normalizedVolume)

  player.loadAudioFile('techno.mp3').then(() => player?.play());
  gsap.to(modal, { autoAlpha: 0, duration: 0.5});

  player.on('beat', () => {
    content!.beated()
  });
}, { once: true });


playButton!.addEventListener('click', () => {
  if(player !== null) player.play();
}, { passive: true });

stopButton!.addEventListener('click', () => {
  if(player !== null) player.stop();
}, { passive: true });


volume!.addEventListener('input', (e) => {
  const volumeValue = parseInt((e.target as HTMLInputElement).value, 10);
  const normalizedVolume = Math.max(Math.min(100, volumeValue),0) / 100;
  setVolume(normalizedVolume)
}, { passive: true })

