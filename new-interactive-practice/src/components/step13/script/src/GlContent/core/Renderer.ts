import * as THREE from 'three';
import { coreStore } from './CoreStore';
import { CORE_STORE_KEY } from '../config';

export class Renderer extends THREE.WebGLRenderer {
  constructor(parameters?: THREE.WebGLRendererParameters | undefined) {
    super(parameters);
  }

  init() {
    this.setClearColor(0x000000, 1);
    this.clearDepth();
    this.domElement.style.width = "100%";
    this.domElement.style.height = "100%";
    this.outputEncoding = THREE.sRGBEncoding;
    this.toneMapping = THREE.ACESFilmicToneMapping;
    this.toneMappingExposure = 2.5;
    this.shadowMap.enabled = true;
    coreStore.setObject(CORE_STORE_KEY.mainRenderer, this);
  }

  resize(resolution: {x: number, y: number}, pixelRatio: number) {
    this.setSize(resolution.x, resolution.y, false);
    this.setPixelRatio(pixelRatio);
  }
}