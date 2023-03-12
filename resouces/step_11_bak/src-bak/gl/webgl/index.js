import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { lerp } from '../../mathUtils';

export default class index {
  constructor(canvas) {
    this.camera = null;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      depth: true,
    })
    this.scene = new THREE.Scene();
    this.animationMixer = null
    this.animationClip = null;
    this.animationAction = null;
    this.time = 0;
    this.progress = 0;
    this.clock = new THREE.Clock();
  }

  async init() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('./assets/animationTest.glb')
    console.log(gltf);
    this.camera = gltf.cameras[0];
    this.scene.add(gltf.scene)
    this.animationClip = gltf.animations[0];
    this.animationMixer = new THREE.AnimationMixer(this.camera.parent);
    this.animationAction = this.animationMixer.clipAction(this.animationClip);

    const ambientLight = new THREE.AmbientLight(0xffffff, .8);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, .2);
    pointLight.position.set(10, -10, 40);
    this.scene.add(pointLight);
    // this.animationAction.paused = true;
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
    this.animationAction.play();
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    const targetTime = this.animationClip.duration * this.progress;
    this.time += (targetTime - this.time) * 0.2;
    this.animationMixer.setTime(this.time);
    this.renderer.render(this.scene, this.camera);
  }

  setProgress(value) {
    if(value < 0 || value > 1 ) return;
    // this.time = this.animationClip.duration * value;
    this.progress = value
  }
}