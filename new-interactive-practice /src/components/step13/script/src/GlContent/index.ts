import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'
import Framer from '@ray-zero2/animation-framer';
import gui from './utils/gui'

import { Renderer } from './core/Renderer';
import { Camera } from './core/Camera';
import MainScene  from './scene';
import PostProcess from './postprocesses';

export default class WebGLContent {
  private canvas: HTMLCanvasElement;
  private time: number;
  // add private properties
  private resolution: { x: number; y: number };
  private dpr: number;
  private renderer: Renderer;
  private mainScene: MainScene;
  private camera: Camera;

  private stats: Stats;
  private framer: Framer;
  private gui: typeof gui;
  postProcess: PostProcess;

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

    this.camera = new Camera({
      fov: 30,
      aspect: this.resolution.x / this.resolution.y,
      far: 100,
      near: 0.1,
      canvas,
      enableControl: true,
      enableDamping: true,
      dampingFactor: 0.05
    });

    this.stats = new Stats()
    this.gui = gui;
    this.framer = Framer.getInstance();
    this.mainScene = new MainScene();
    this.postProcess = new PostProcess();
    this.init().then(this.start.bind(this));
  }

  resize(width: number, height: number) {
    this.resolution.x = width;
    this.resolution.y = height;
    this.dpr = Math.min(window.devicePixelRatio , 2);
    this.camera.resize(this.resolution);
    this.renderer.resize(this.resolution, this.dpr)
    this.postProcess.resize(this.resolution);
  }

  async init() {
    document.body.appendChild(this.stats.dom);
    this.renderer.init();
    this.camera.init();
    this.mainScene.init();
    this.postProcess.init(this.mainScene);
    this.bind();
    this.handleResize();
  }

  start() {
    this.framer.start();
  }

  animate({ deltaTime }: { deltaTime: number }) {
    this.time += deltaTime;
    this.camera.update(deltaTime);
    this.mainScene.update(deltaTime);
    this.postProcess.render(deltaTime);
    this.stats.update();
  }

  handleResize() {
    this.resize(window.innerWidth, window.innerHeight);
  }

  bind() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.framer.add({ id: 'gl1', update: this.animate.bind(this) })
  }
}
