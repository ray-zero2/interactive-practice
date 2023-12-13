import * as THREE from 'three';
import Trails from './trails/Trails';
import { CORE_STORE_KEY } from '../config';
import { coreStore } from '../core/CoreStore';

export default class MainScene extends THREE.Scene {
  time: number = 0;
  trails: Trails;

  constructor() {
    super();
    const renderer = coreStore.getObject(CORE_STORE_KEY.mainRenderer) as THREE.WebGLRenderer;
    const num = 4096/4;
    const length = 32 ;
    this.trails = new Trails(renderer, num, length);
    this.add(this.trails);
  }

  init() {
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    this.trails.update(deltaTime);
  }

}
