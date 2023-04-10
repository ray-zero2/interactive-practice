import * as THREE from "three";
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';
import gsap from "gsap";
import { customizeMaterial } from "../utils/customizeMaterial";
import gui from '../utils/gui'

import computePositionFrag from './glsl/computePosition.fs';
import computeVelocityFrag from './glsl/computeVelocity.fs';
import begin_vertex from './glsl/begin_vertex.vs';
import beginnormal_vertex from './glsl/beginnormal_vertex.vs';
import common_vs from './glsl/common.vs';
import uv_vertex from './glsl/uv_vertex.vs';
import project_vertex from './glsl/project_vertex.vs';

export default class Index {
  uniforms: { [x: string]: { value: any } };
  geometry: THREE.OctahedronGeometry;
  material: { material: any; uniforms: any; };
  depthMaterial: { material: any; uniforms: any; };
  obj: THREE.Mesh<THREE.OctahedronGeometry, any>;
  time: number;
  id: any;
  constructor(renderer: THREE.WebGLRenderer) {
    this.uniforms = {
      uTime: { value: 0 },
      factor1: {value: 0},
      // factor2: {value: 0},
    };
    this.geometry = new THREE.OctahedronGeometry(1, 20);
    this.material = customizeMaterial(new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      defines: {
        USE_UV: true,
        USE_TANGENT: true
      },
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
    this.obj = new THREE.Mesh(this.geometry, this.material.material);
    this.geometry.computeVertexNormals();
    this.time = 0;


    this.init();
  }

  init() {
    this.obj.castShadow = true;
    this.obj.receiveShadow = true;
    this.obj.customDepthMaterial = this.depthMaterial.material;

    const folder = gui.addFolder(`sphere - ${this.id}`)
    folder.add(this.uniforms.factor1, 'value').min(0).max(1).step(0.01);
    // folder.add(this.uniforms.factor2, 'value').min(0).max(1).step(0.01);

    this.initGeometry();
    this.startMoveParam();
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    this.uniforms.uTime.value = this.time;
  }

  startMoveParam() {
    // const tl = gsap.timeline({repeat:-1, yoyo:true});
    // tl
    //   .set(this.uniforms.factor1, { value: 0, duration: 0 })
    // //   // .set(this.uniforms.factor2, { value: 0, duration: 0})
    //   .to(this.uniforms.factor1, { value: 1, duration: 0.5 })
    // //   .to(this.uniforms.factor2, { value: 1, duration: 0.2 })
    // //   .set(this.uniforms.factor2, { value: 1, delay: 0.4})
    // .to(this.uniforms.factor1, { value: 1, delay: 1. })
  }

  initGeometry() {
    const geometry = this.geometry;
    const position = geometry.getAttribute('position');
    const positionNum = position.count;

    const randomAttrib1 = new Float32Array(positionNum * 3);
    const randomAttrib2 = new Float32Array(positionNum * 3);
    const centerAttribute = new Float32Array(positionNum * 3);
    for(let i = 0; i < positionNum; i++) {
      const baseMeshIndex = i * 3;
      const xRandom1 = Math.random(); // /2 + 0.5;
      const yRandom1 = Math.random(); // /2 + 0.5;
      const zRandom1 = Math.random(); // /2 + 0.5;
      const xRandom2 = Math.random(); // /2 + 0.5;
      const yRandom2 = Math.random(); // /2 + 0.5;
      const zRandom2 = Math.random(); // /2 + 0.5;

      for(let j = 0; j < 3; j++) {
        const basePointIndex = baseMeshIndex * 3 + j * 3;
        randomAttrib1[basePointIndex + 0] = xRandom1
        randomAttrib1[basePointIndex + 1] = yRandom1
        randomAttrib1[basePointIndex + 2] = zRandom1

        randomAttrib2[basePointIndex + 0] = xRandom2
        randomAttrib2[basePointIndex + 1] = yRandom2
        randomAttrib2[basePointIndex + 2] = zRandom2
      }
    }

    // console.log({positionNum});
    // for (let i = 0; i < positionNum * 3; i += 9) {
    //   const x1 = position.getX(i);
    //   const y1 = position.getX(i+1);
    //   const z1 = position.getX(i+2);

    //   const x2 = position.getX(i+3);
    //   const y2 = position.getX(i+4);
    //   const z2 = position.getX(i+5);

    //   const x3 = position.getX(i+6);
    //   const y3 = position.getX(i+7);
    //   const z3 = position.getX(i+8);

    //   const xCenter = (x1+x2+x3)/3;
    //   const yCenter = (y1+y2+y3)/3;
    //   const zCenter = (z1+z2+z3)/3;

    //   centerAttribute[i] = xCenter;
    //   centerAttribute[i+1] = yCenter;
    //   centerAttribute[i+2] = zCenter;
    //   centerAttribute[i+3] = xCenter;
    //   centerAttribute[i+4] = yCenter;
    //   centerAttribute[i+5] = zCenter;
    //   centerAttribute[i+6] = xCenter;
    //   centerAttribute[i+7] = yCenter;
    //   centerAttribute[i+8] = zCenter;
    // }

    geometry.setAttribute('random1', new THREE.BufferAttribute( randomAttrib1, 3 ) );
    geometry.setAttribute('random2', new THREE.BufferAttribute( randomAttrib2, 3 ) );
    // geometry.setAttribute('center', new THREE.BufferAttribute(centerAttribute, 3));
    // console.log(centerAttribute);
  }

  customizeShader(shader: THREE.ShaderMaterial, renderer?: THREE.WebGLRenderer) {
    shader.vertexShader =
      shader.vertexShader
        .replace('#include <common>', common_vs)
    //     .replace('#include <uv_vertex>', uv_vertex)
    //     .replace('#include <beginnormal_vertex>', beginnormal_vertex)
        .replace('#include <begin_vertex>', begin_vertex)
        .replace('#include <project_vertex>', project_vertex);
        // .replace('#include <begin_vertex>', begin_vertex);

    // shader.fragmentShader =
    //   shader.fragmentShader
    // //     .replace('#include <common>', `
    // //       #include <common>
    // //       uniform sampler2D texturePosition;
    // //     `)
    // //     // .replace('#include <normal_fragment_begin>', normal_fragment_begin)
    // //     // .replace('#include <aomap_fragment>', aomap_fragment)
    //     .replace('#include <output_fragment>', `#include <output_fragment>
    //       gl_FragColor = vec4(vUv.xy, .0, 1.);
    //     `);

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