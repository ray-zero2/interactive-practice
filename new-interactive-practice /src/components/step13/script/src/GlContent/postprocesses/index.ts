import * as THREE from "three";
import { EffectPass, DepthOfFieldEffect, VignetteEffect, EffectComposer, RenderPass, FXAAEffect, SepiaEffect, SMAAEffect } from 'postprocessing';
import { gui } from "../utils/gui";
import { coreStore } from "../core/CoreStore";
import { CORE_STORE_KEY, LAYER } from "../config";
import type { Renderer } from "../core/Renderer";
import type { Camera } from "../core/Camera";

export default class PostProcess extends EffectComposer {
  camera: Camera | undefined;
  renderer: Renderer | undefined;
  dofEffect: DepthOfFieldEffect | undefined;
  constructor() {
    super();
  }

  init(mainScene: THREE.Scene) {
    this.renderer = coreStore.getObject(CORE_STORE_KEY.mainRenderer) as Renderer;
    this.camera = coreStore.getObject(CORE_STORE_KEY.mainCamera) as Camera;
  
    this.setRenderer(this.renderer);
    this.addPass(new RenderPass(mainScene, this.camera));

    this.dofEffect = new DepthOfFieldEffect(this.camera, {
      focalLength: 0.07,
      bokehScale: 0,
      resolutionScale: 0.25
    });
    this.dofEffect.target = new THREE.Vector3(0, 0, 0);
    const dofPass = new EffectPass(this.camera, this.dofEffect);
    this.addPass(dofPass);
    // this.composer.addPass(new EffectPass(this.camera, new VignetteEffect()));

    const folder = gui.addFolder('Depth of field')
    folder
      .add({ enabled: dofPass.enabled }, 'enabled')
      .onChange((value: boolean) => {
        dofPass.enabled = value
      })
    folder.add(this.dofEffect, 'bokehScale').min(0).max(20).step(0.5)
    folder
      .add(this.dofEffect.circleOfConfusionMaterial, 'focalLength')
      .min(0.01)
      .max(0.15)
      .step(0.01)
    console.log(this.camera);
  }

  render(deltaTime: number) {
    this.dofEffect!.target = this.camera!.lookAtPosition;
    super.render(deltaTime);
  }

  resize(resolution: { x: number, y: number }) {
    this.setSize(resolution.x, resolution.y, false);
  }
}