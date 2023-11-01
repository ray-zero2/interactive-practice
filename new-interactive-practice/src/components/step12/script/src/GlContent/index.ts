import * as THREE from 'three';
import Stats from 'stats.js'
import Framer from '@packages/animationFramer';
import gui from './utils/gui'
import { EffectPass, DepthOfFieldEffect, VignetteEffect, EffectComposer, RenderPass, FXAAEffect, SepiaEffect, SMAAEffect } from 'postprocessing';

import Camera from './Camera';

import Plane from './plane';
import Sphere from './sphere';
import SpotLight from './lights/spotlight'

export default class WebGLContent {
  private canvas: HTMLCanvasElement;
  private time: number;
  // add private properties
  private resolution: { x: number; y: number };
  private dpr: number;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: Camera;
  private lights: {
    [x: string]: any
  }
  private plane: Plane | null;
  private sphere: Sphere | null;
  private composer: EffectComposer;
  private stats: Stats;
  private framer: Framer;
  private gui: typeof gui;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.time = 0;
    this.resolution = {
      x: canvas.offsetWidth,
      y: canvas.offsetHeight
    };
    this.dpr = Math.min(window.devicePixelRatio, 2);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // antialias: false,
      // stencil: false,
      depth: true,
      powerPreference: "high-performance",
    });
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.scene = new THREE.Scene();
    this.camera = new Camera({
      fov: 30,
      aspect: this.resolution.x / this.resolution.y,
      far: 100,
      near: 0.1,
      canvas,
      enableControl: false,
      enableDamping: false,
      // dampingFactor: 0.05
    });
    this.lights = {
      spot1: new SpotLight(),
      spot2: new SpotLight('#ffe5e5'),
      spot3: new SpotLight('#d1ffff'),
    };
    this.plane = null;
    this.sphere = null;
    this.composer = new EffectComposer(undefined, {
      multisampling: this.dpr === 1 ? 2 : undefined,
    });

    this.stats = new Stats()
    this.gui = gui;
    this.framer = Framer.getInstance();

    this.init().then(this.start.bind(this));
  }

  resize(width: number, height: number) {
    this.resolution.x = width;
    this.resolution.y = height;
    this.dpr = Math.min(window.devicePixelRatio , 2);
    this.renderer.setSize(this.resolution.x, this.resolution.y, false);
    this.camera.resize(this.resolution);
    this.composer?.setSize(this.resolution.x, this.resolution.y);
  }

  async init() {
    document.body.appendChild(this.stats.dom);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 2.5;

    this.plane = new Plane(10, 10, 256 * 2, 256 * 2);
    this.scene.add(this.plane.obj);

    this.sphere = new Sphere();
    this.scene.add(this.sphere.obj);

    this.scene.add(this.lights.spot1);
    this.scene.add(this.lights.spot2);
    this.scene.add(this.lights.spot3);

    const spotLightHelper1 = this.lights.spot1.getHelper();
    const spotLightHelper2 = this.lights.spot2.getHelper();
    const spotLightHelper3 = this.lights.spot3.getHelper();
    this.scene.add( spotLightHelper1 );
    this.scene.add( spotLightHelper2 );
    this.scene.add( spotLightHelper3 );
    spotLightHelper1.visible = false;
    spotLightHelper2.visible = false;
    spotLightHelper3.visible = false;

    this.camera.init();
    this.setRenderer();
    this.setLights();
    this.setEffect();
    this.bind();

    this.handleResize();
  }

  start() {
    this.framer.start();
  }

  animate({ deltaTime }: { deltaTime: number }) {
    this.time += deltaTime;

    this.lights.spot1.update(deltaTime);
    this.camera.update(deltaTime);
    this.plane!.update(deltaTime);
    this.sphere!.update(deltaTime);
    this.composer.render(deltaTime);
    this.stats.update();
  }

  setRenderer() {
    this.renderer.setSize(this.resolution.x, this.resolution.y, false);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.shadowMap.enabled = true;
  }

  setLights() {
    const {spot1, spot2, spot3} = this.lights;
    spot1.angle = 1.5707963267948966;
    spot1.distance = 50;
    spot1.position.set(0, 3, 4);
    spot1.penumbra = 0.628318530717959;
    spot1.decay = 0;
    spot1.intensity = 8;

    spot2.angle = 0.80285;
    spot2.distance = 26;
    spot2.position.set(-8, 2, -5);
    spot2.penumbra = 0.52;
    spot2.decay = 0;
    spot2.intensity = 2.66;

    spot3.angle = 0.94;
    spot3.distance = 19;
    spot3.position.set(7, 7, -2);
    spot3.penumbra = 1;
    spot3.decay = 0;
    spot3.intensity = 2.4;

    // spot1.setGui();
    // spot2.setGui();
    // spot3.setGui();
  }

  setEffect() {
    this.composer.setRenderer(this.renderer);
    this.composer.setSize(this.resolution.x, this.resolution.y, false);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const dofEffect = new DepthOfFieldEffect(this.camera, {
      focalLength: 0.07,
      bokehScale: 11,
      resolutionScale: 0.25
    });
    dofEffect.target = new THREE.Vector3(0, 0, 0);
    const dofPass = new EffectPass(this.camera, dofEffect);
    this.composer.addPass(dofPass);
    // this.composer.addPass(new EffectPass(this.camera, new VignetteEffect()));

    const folder = this.gui.addFolder('Depth of field')
    folder
      .add({ enabled: dofPass.enabled }, 'enabled')
      .onChange((value: boolean) => {
        dofPass.enabled = value
      })
    folder.add(dofEffect, 'bokehScale').min(0).max(20).step(0.5)
    folder
      .add(dofEffect.cocMaterial, 'focalLength')
      .min(0.01)
      .max(0.5)
      .step(0.01)
  }

  handleResize() {
    // const width = this.canvas.offsetWidth;
    // const height = this.canvas.offsetHeight;
    // console.log(window.innerWidth, window.innerHeight);
    this.resize(window.innerWidth, window.innerHeight);
  }

  bind() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.framer.add({ id: 'gl1', update: this.animate.bind(this) })
  }
}
