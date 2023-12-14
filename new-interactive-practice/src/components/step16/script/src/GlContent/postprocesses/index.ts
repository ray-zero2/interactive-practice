import * as THREE from "three";
import { EffectPass, GlitchEffect, VignetteEffect, EffectComposer, RenderPass, FXAAEffect, SepiaEffect, SMAAEffect, HueSaturationEffect, BlendFunction, ShaderPass } from 'postprocessing';
import { gui } from "../utils/gui";
import { coreStore } from "../core/CoreStore";
import { CORE_STORE_KEY, LAYER } from "../config";
import type { Renderer } from "../core/Renderer";
import type { OrbitCamera } from "../core/OrbitCamera";
import gsap from 'gsap';

import colorVert from './shaders/color.vert';
import colorFrag from './shaders/color.frag';
import splitVert from './shaders/split.vert';
import splitFrag from './shaders/split.frag';

export default class PostProcess extends EffectComposer {
  renderer: Renderer | undefined;
  orbitCamera: OrbitCamera | undefined;
  time: number = 0;
  resolution: { x: number, y: number } = { x: 0, y: 0 };
  colorUniforms: THREE.ShaderMaterialParameters['uniforms'];
  splitUniforms: THREE.ShaderMaterialParameters['uniforms'];
  constructor() {
    super();
  }

  init(mainScene: THREE.Scene) {
    this.renderer = coreStore.getObject(CORE_STORE_KEY.mainRenderer) as Renderer;
    this.orbitCamera = coreStore.getObject(CORE_STORE_KEY.mainCamera) as OrbitCamera;
    const camera = this.orbitCamera.getCamera();

    this.setRenderer(this.renderer);
    this.addPass(new RenderPass(mainScene, camera));

    const colorGui = gui.addFolder('Color');


    this.colorUniforms = {
      inputBuffer: { value: null },
      nega: { value: 0.0 },
    }
    const colorPass = new ShaderPass(new THREE.RawShaderMaterial( {
      uniforms: this.colorUniforms,
      vertexShader: colorVert,
      fragmentShader: colorFrag
    } ));
    this.addPass(colorPass);

    const glitchEffect = new EffectPass(camera, new GlitchEffect());
    this.addPass(glitchEffect);

    this.splitUniforms = {
      inputBuffer: { value: null },
      splitNum: { value: new THREE.Vector2(1, 1) },
      resolution: { value: new THREE.Vector2(this.resolution.x, this.resolution.y) },
    }
    const splitPass = new ShaderPass(new THREE.RawShaderMaterial( {
      uniforms: this.splitUniforms,
      vertexShader: splitVert,
      fragmentShader: splitFrag
    } ));
    this.addPass(splitPass);

    const vignetteEffect = new EffectPass(camera, new VignetteEffect())
    this.addPass(vignetteEffect);
  }

  render(deltaTime: number) {
    super.render(deltaTime);
  }

  resize(resolution: { x: number, y: number }) {
    this.resolution = resolution;
    this.splitUniforms!.resolution.value = new THREE.Vector2(resolution.x, resolution.y) ;
    this.setSize(resolution.x, resolution.y, false);
  }

  effect() {
    const colorEffectEnabled = Math.random() > 0.8;
    if(colorEffectEnabled) {
      gsap.fromTo(this.colorUniforms!.nega, { value: 0 }, {value: 1, duration: 0.3, ease: 'power4.inOut', yoyo: true, repeat: 1})
    }

    const splitedEnabled = Math.random() > 0.9;
    if(splitedEnabled){
      const splitNum = new THREE.Vector2(Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1);
      gsap.fromTo(this.splitUniforms!.splitNum.value, { x: 1, y: 1 }, { x: splitNum.x, y: splitNum.y, duration: 2, ease: 'steps(1)', yoyo: true, repeat: 1})
    }
  }
}
