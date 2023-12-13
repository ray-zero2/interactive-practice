import filmer from '@craf-te/filmer';
import { gui } from './utils/gui'

import { Renderer } from './core/Renderer';
import MainScene  from './scene';
import PostProcess from './postprocesses';
import { coreStore } from './core/CoreStore';
import { CORE_STORE_KEY } from './config';
import { OrbitCamera } from './core/OrbitCamera';
import gsap from 'gsap';

export default class WebGLContent {
  private canvas: HTMLCanvasElement;
  private time: number;

  private resolution: { x: number; y: number };
  private dpr: number;
  private renderer: Renderer;
  private mainScene: MainScene;
  // private camera: THREE.PerspectiveCamera | OrbitControls;

  private gui: typeof gui;
  postProcess: PostProcess;
  orbitCamera: OrbitCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.time = 0;

    this.resolution = {
      x: canvas.offsetWidth,
      y: canvas.offsetHeight
    };
    this.dpr = Math.min(window.devicePixelRatio, 2);

    this.renderer = new Renderer({
      canvas,
      depth: true,
      powerPreference: "high-performance",
    });
    coreStore.setObject(CORE_STORE_KEY.mainRenderer, this.renderer);
    this.orbitCamera = new OrbitCamera({
      fov: 45,
      aspect: this.resolution.x / this.resolution.y,
      far: 1000,
      near: 0.1
    }, {
      canvas,
      enableDamping: true,
      dampingFactor: 0.05,
    });
    coreStore.setObject(CORE_STORE_KEY.mainCamera, this.orbitCamera);

    this.gui = gui;
    this.mainScene = new MainScene();
    this.postProcess = new PostProcess();
    this.init().then(this.start.bind(this));
  }

  resize(width: number, height: number) {
    this.resolution.x = width;
    this.resolution.y = height;
    this.dpr = Math.min(window.devicePixelRatio , 2);
    this.orbitCamera.resize(this.resolution);
    this.renderer.resize(this.resolution, this.dpr)
    this.postProcess.resize(this.resolution);
  }

  async init() {
    this.renderer.init();
    this.orbitCamera.init();
    this.mainScene.init();
    this.postProcess.init(this.mainScene);
    this.bind();
    this.handleResize();
  }

  start() {
    filmer.start();
  }

  animate({ deltaTime }: { deltaTime: number }) {
    this.time += deltaTime;
    this.orbitCamera.update();
    this.mainScene.update(deltaTime);
    this.postProcess.render(deltaTime);
  }

  moveTrails() {
    const trails = this.mainScene.trails;
    gsap.fromTo(trails, {
      factor: 0,
    }, {
      factor: 1,
      duration:0.1,
      yoyo: true,
      repeat: 1,
    })
  }


  beated() {
    this.moveTrails();
    this.orbitCamera.shake();
    this.postProcess.effect();
  }

  handleResize() {
    this.resize(window.innerWidth, window.innerHeight);
  }

  bind() {
    window.addEventListener('resize', this.handleResize.bind(this));
    filmer.add('gl1', this.animate.bind(this), 1);
  }
}
