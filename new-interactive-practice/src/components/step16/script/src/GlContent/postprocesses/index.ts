import * as THREE from "three";
import { EffectPass, GlitchEffect, VignetteEffect, EffectComposer, RenderPass, FXAAEffect, SepiaEffect, SMAAEffect, HueSaturationEffect, BlendFunction, ShaderPass } from 'postprocessing';
import { gui } from "../utils/gui";
import { coreStore } from "../core/CoreStore";
import { CORE_STORE_KEY, LAYER } from "../config";
import type { Renderer } from "../core/Renderer";
import type { OrbitCamera } from "../core/OrbitCamera";
import gsap from 'gsap';

import vertexShader from './shaders/color.vert';
import fragmentShader from './shaders/color.frag';

export default class PostProcess extends EffectComposer {
  renderer: Renderer | undefined;
  orbitCamera: OrbitCamera | undefined;
  time: number =0;
  colorUniforms: THREE.ShaderMaterialParameters['uniforms'];
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
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    } ));
    this.addPass(colorPass);

    const vignetteEffect = new EffectPass(camera, new VignetteEffect())
    this.addPass(vignetteEffect);

    const glitchEffect = new EffectPass(camera, new GlitchEffect());
    this.addPass(glitchEffect);
  }

  render(deltaTime: number) {
    // this.dofEffect!.target = this.camera!.lookAtPosition;
    // this.time += deltaTime;
    // const value = Math.sin(this.time)* 0.5 + 0.5;
    // this.colorUniforms!.nega.value = value;
    super.render(deltaTime);
  }

  resize(resolution: { x: number, y: number }) {
    this.setSize(resolution.x, resolution.y, false);
  }

  effect() {
    const random = Math.random();
    const enabled = random > 0.8;
    if(enabled) {
      gsap.fromTo(this.colorUniforms!.nega, { value: 0 }, {value: 1, duration: 0.3, ease: 'power4.inOut', yoyo: true, repeat: 1})
    }
  }
}
