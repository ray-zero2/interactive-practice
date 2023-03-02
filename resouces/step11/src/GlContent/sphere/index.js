import * as THREE from "three";
import { customizeMaterial } from "../utils/customizeMaterial";

import begin_vertex from './glsl/begin_vertex.vs';
import beginnormal_vertex from './glsl/beginnormal_vertex.vs';
import common_vs from './glsl/common.vs';
import uv_vertex from './glsl/uv_vertex.vs';
import project_vertex from './glsl/project_vertex.vs';

export default class Index {
  constructor() {
    this.uniforms = { uTime: { value: 0 } };
    this.geometry = new THREE.OctahedronGeometry(1, 20);
    this.material = customizeMaterial(new THREE.MeshStandardMaterial(),
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
    this.obj = new THREE.Mesh(this.geometry, this.material.material);
    this.geometry.computeVertexNormals();
    this.time = 0;

    this.init();
  }

  init() {
    this.obj.castShadow = true;
    this.obj.receiveShadow = true;
    this.obj.customDepthMaterial = this.depthMaterial.material;

    this.initGeometry();
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.uniforms.uTime.value = this.time;
  }

  customizeShader(shader, renderer) {
    console.log(shader);
    shader.vertexShader =
      shader.vertexShader
        .replace('#include <common>', common_vs)
    //     .replace('#include <uv_vertex>', uv_vertex)
    //     .replace('#include <beginnormal_vertex>', beginnormal_vertex)
        .replace('#include <begin_vertex>', begin_vertex)
        // .replace('#include <project_vertex>', project_vertex);
        // .replace('#include <begin_vertex>', begin_vertex);

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

  initGeometry() {
    const geometry = this.obj.geometry;
  }
}