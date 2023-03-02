import * as THREE from "three";
import { customizeMaterial } from "../utils/customizeMaterial";

import begin_vertex from './glsl/begin_vertex.vs';
import beginnormal_vertex from './glsl/beginnormal_vertex.vs';
import common_vs from './glsl/common.vs';
import uv_vertex from './glsl/uv_vertex.vs';

export default class Index {
  constructor() {
    this.uniforms = { uTime: { value: 0 } };
    this.geometry = new THREE.SphereGeometry( 1, 256, 256 );
    this.material = customizeMaterial(new THREE.MeshStandardMaterial({
        flatShading: true,
        metalness: 1.2,
        roughness: 1,
        envMapIntensity: 0.9,
        defines: {
        },
      }),
      this.uniforms,
      this.customizeShader.bind(this));

    this.obj = new THREE.Mesh(this.geometry, this.material.material);
    this.time = 0;
    this.depthMaterial = customizeMaterial(
      new THREE.MeshDepthMaterial({
        depthPacking: THREE.RGBADepthPacking,
      }),
      this.uniforms,
      this.customizeShader.bind(this)
    );
    this.init();
  }

  init() {
    this.obj.castShadow = true
    this.obj.receiveShadow = true
    this.obj.customDepthMaterial = this.depthMaterial.material;
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.uniforms.uTime.value = this.time;
  }

  customizeShader(shader, renderer) {
    console.log(shader.vertexShader);
    shader.vertexShader =
      shader.vertexShader
        .replace('#include <common>', common_vs)
        .replace('#include <uv_vertex>', uv_vertex)
        .replace('#include <beginnormal_vertex>', beginnormal_vertex)
        .replace('#include <begin_vertex>', begin_vertex);

    // shader.fragmentShader =
    //   shader.fragmentShader
    //     .replace('#include <common>', common_fs)
    //     .replace('#include <normal_fragment_begin>', normal_fragment_begin)
    //     .replace('#include <aomap_fragment>', aomap_fragment)
    //     .replace('#include <output_fragment>', output_fragment);

      // // test
      // shader.fragmentShader =
      //   shader.fragmentShader
      //     .replace('#include <common>', `
      //       #include <common>
      //       uniform float uTime;
      //     `)
      //     .replace('#include <output_fragment>',
      //     `
      //       #include <output_fragment>
      //       gl_FragColor = vec4(abs(sin(uTime)), 0., 0., 1.);
      //     `);

  }
}