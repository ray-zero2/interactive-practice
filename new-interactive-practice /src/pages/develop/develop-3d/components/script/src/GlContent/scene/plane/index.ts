import * as THREE from "three";
import { customizeMaterial } from "../../utils/customizeMaterial";
import common_vs from './shaders/common.vs';
import begin_vertex from "./shaders/begin_vertex.vs";


export default class Plane {
  uniforms: { [x: string]: { value: any } };
  material: { material: any; uniforms: any; };
  depthMaterial: { material: any; uniforms: any; };
  obj: THREE.Mesh<THREE.PlaneGeometry, any>;
  time: number;
  timescale: number;

  constructor(
    width: number,
    height: number,
    widthSegment: number,
    heightSegment: number
  ) {
    this.uniforms = {
      uTime: {
        value: 0,
      },
    }

    const geometry = new THREE.PlaneGeometry(width, height, widthSegment, heightSegment);
    geometry.computeTangents();
    this.material = customizeMaterial(
      new THREE.MeshStandardMaterial({
        flatShading: true,
        metalness: 1.1,
        roughness: 3,
      }),
      this.uniforms,
      this.customizeShader.bind(this)
    );
    this.depthMaterial = customizeMaterial(
      new THREE.MeshDepthMaterial({
        depthPacking: THREE.RGBADepthPacking,
      }),
      this.uniforms,
      this.customizeShader.bind(this)
    );
    this.obj = new THREE.Mesh(geometry, this.material.material);
    this.time = 0;
    this.timescale = 1;

    this.init();
  }

  init() {
    this.obj.castShadow = true
    this.obj.receiveShadow = true
    this.obj.customDepthMaterial = this.depthMaterial.material;
    this.obj.rotation.x = -Math.PI / 2
    this.obj.scale.set(3, 3, 3);
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    this.uniforms.uTime.value = this.time * this.timescale;
  }

  customizeShader(shader: THREE.ShaderMaterial, renderer?: THREE.WebGLRenderer) {
    shader.vertexShader =
      shader.vertexShader
        .replace('#include <common>', common_vs)
        .replace('#include <begin_vertex>', begin_vertex);
  }
}