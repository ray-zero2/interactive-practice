import filmer from "@craf-te/filmer";
import {gui} from '../GlContent/utils/gui';
import Event from 'eventemitter3';
export class MusicPlayer extends Event {
  private audioContext: AudioContext;
  private sourceNode: AudioBufferSourceNode | null = null;
  private analyser: AnalyserNode;
  private gainNode: GainNode;
  private minFrequency: number;
  private maxFrequency: number;
  public beatDetected: number;
  audioGui: any;
  threshold: number;
  private audioBuffer: AudioBuffer | null = null;
  isPlaying: boolean;

  constructor(minFrequency: number, maxFrequency: number) {
    super();
    this.isPlaying = false;

    this.audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.gainNode = this.audioContext.createGain(); // Create GainNode for volume control

    // Set the frequency range for beat detection
    this.minFrequency = minFrequency;
    this.maxFrequency = maxFrequency;
    this.threshold = 250;

    this.beatDetected = 0;
    this.audioGui = gui.addFolder('Audio');

    this.audioGui.add(this, 'minFrequency', 0, 150);
    this.audioGui.add(this, 'maxFrequency', 0, 150);
    this.audioGui.add(this, 'threshold', 100, 400);
  }

  async loadAudioFile(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.prepareSourceNode();
  }

  prepareSourceNode() {
    if (this.audioBuffer) {
      this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode.buffer = this.audioBuffer;
      this.sourceNode.loop = true;
      this.sourceNode.connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  detectBeat() {
    let freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(freqData);

    // Calculate the indexes in the frequency data that correspond to the desired frequency range
    let minIndex = Math.round(this.minFrequency / this.audioContext.sampleRate * freqData.length);
    let maxIndex = Math.round(this.maxFrequency / this.audioContext.sampleRate * freqData.length);

    let beatThreshold = this.threshold; // This value is arbitrary, needs to be fine-tuned for actual music
    let beatDetected = 0;
    for (let i = minIndex; i < maxIndex; i++) {
      if (freqData[i] > beatThreshold) {
        beatDetected = 1;
        break;
      } else {
        beatDetected = 0;
      }
    }

    if(this.beatDetected !== beatDetected) {
      if(this.beatDetected === 1) this.emit('beat');
    }
    this.beatDetected = beatDetected;
  }

  play() {
    if(this.isPlaying) return;
    this.isPlaying = true;
    if (!this.sourceNode) {
      this.prepareSourceNode();
    }
    this.sourceNode!.start(0);

    filmer.add('beatDetected', this.detectBeat.bind(this), 0);
    filmer.start();
  }

  stop() {
    if(!this.isPlaying) return;
    this.isPlaying = false;

    this.sourceNode!.stop(0);
    this.sourceNode = null;
    filmer.remove('beatDetected')
  }

  mute() {
    this.gainNode.gain.value = 0;
  }

  setVolume(volume: number) {
    this.gainNode.gain.value = volume;
  }
}
