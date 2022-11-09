import * as THREE from 'three';
import Framer from '@ray-zero2/animation-framer';
import { PerspectiveCamera } from 'three';

export default class index {

  constructor(canvas) {
    this.camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      depth: true
    });
    this.scene = new THREE.Scene();
    this.time = 0;
    this.progress = 0;
    this.framer = Framer.getInstance();
  }

  async init() {
  }

  resize(width, height) {
    this.setRenderer(width, height);
    this.setCamera(width, height)
  }

  setRenderer(width, height) {
    this.renderer.setSize(width, height);
  }

  setCamera(width, height) {
    this.camera.aspect = width / height;
    this.camera.far = 10000;
    this.camera.updateProjectionMatrix();
  }

  start() {
    this.framer.add({
      id: 'obj1',
      update: this.render.bind(this)
    })
    this.framer.start();
  }

  render({deltaTime}) {
    this.time += deltaTime;
    console.log(this.time);
    // this.renderer.render(this.scene, this.camera);
  }
}