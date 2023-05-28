import * as THREE from "three";
import { EffectPass, DepthOfFieldEffect, VignetteEffect, EffectComposer, RenderPass, FXAAEffect, SepiaEffect, SMAAEffect, ShaderPass } from 'postprocessing';
import { gui } from "../utils/gui";
import { coreStore } from "../core/CoreStore";
import { CORE_STORE_KEY, LAYER } from "../config";
import type { Renderer } from "../core/Renderer";
import type { OrbitCamera } from "../core/OrbitCamera";
import mrtVertex from './shaders/mrt.vs';
import mrtFragment from './shaders/mrt.fs';
import testVert from './shaders/composeTest/vert.glsl';
import testFrag from './shaders/composeTest/frag.glsl';
import { PostProcess } from "./postProcess";

export default class Composer extends EffectComposer {
  renderer: Renderer | undefined;
  dofEffect: DepthOfFieldEffect | undefined;
  orbitCamera: OrbitCamera | undefined;
  scene: THREE.Scene | null = null;
  multiRenderTarget: THREE.WebGLMultipleRenderTargets;
  mrtMaterial: THREE.RawShaderMaterial = new THREE.RawShaderMaterial();
  process: any;
  time: number;
  postCamera: THREE.OrthographicCamera;
  postScene: THREE.Scene;
  postPlane: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial>;
  constructor() {
    super();
    this.time = 0;
    this.multiRenderTarget = new THREE.WebGLMultipleRenderTargets(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio,
    2);
    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.postPlane = new THREE.Mesh(
      new THREE.PlaneGeometry( 2, 2 ),
      new THREE.RawShaderMaterial( {
        vertexShader: testVert,
        fragmentShader: testFrag,
        uniforms: {
          colorTex: { value: this.multiRenderTarget.texture[0] },
          normalTex: { value: this.multiRenderTarget.texture[1] },
        },
      } )
    );
  }

  init(mainScene: THREE.Scene, size: {x: number, y: number}) {
    this.renderer = coreStore.getObject(CORE_STORE_KEY.mainRenderer) as Renderer;
    this.orbitCamera = coreStore.getObject(CORE_STORE_KEY.mainCamera) as OrbitCamera;
    this.scene = mainScene;
    this.setRenderer(this.renderer);
    this.initPost(mainScene);

    const folder = gui.addFolder('EffectComposer')
  }

  render(deltaTime: number) {
    this.time += deltaTime
    this.mrtMaterial.uniforms.time.value = this.time;
    // this.dofEffect!.target = this.camera!.lookAtPosition;
    // super.render(deltaTime);
    this.renderer?.setRenderTarget(this.multiRenderTarget);
    this.renderer?.clear()
    this.renderer?.render(this.scene!, this.orbitCamera?.getCamera()!);

    this.renderer?.setRenderTarget(null);
    this.renderer?.clear()
    this.postPlane.material.uniforms.colorTex.value = this.multiRenderTarget.texture[0];
    this.postPlane.material.uniforms.normalTex.value = this.multiRenderTarget.texture[1];
    this.renderer?.render(this.postScene, this.postCamera);
    // this.process.materials[0].uniforms.colorTex.value = this.multiRenderTarget.texture[0];
    // this.process.materials[0].uniforms.normalTex.value = this.multiRenderTarget.texture[1];
    // this.process.render(deltaTime);
  }

  resize(resolution: { x: number, y: number }) {
    this.setSize(resolution.x, resolution.y, false);
  }

  initPost(mainScene: THREE.Scene) {
    //multi
    this.multiRenderTarget.texture.forEach(tex => {
      tex.format = THREE.RGBAFormat;
      tex.minFilter = THREE.NearestFilter;
      tex.magFilter = THREE.NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    });
    this.multiRenderTarget.texture[0].name = 'color';
    this.multiRenderTarget.texture[1].name = 'normal';

    this.mrtMaterial = new THREE.RawShaderMaterial({
      vertexShader: mrtVertex,
      fragmentShader: mrtFragment,
      uniforms: {
        time: { value: 0 }
      }
    });
    this.scene!.overrideMaterial = this.mrtMaterial;
    this.postScene.add(this.postPlane);


    // this.process.add({
    //   uniforms: {

    //   },
    //   // vertexShader: testVert,
    //   fragmentShader: testFrag,
    // });
  }
}