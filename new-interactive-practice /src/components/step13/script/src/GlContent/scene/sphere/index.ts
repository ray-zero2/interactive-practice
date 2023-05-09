import * as THREE from "three";
import gBufferVertex from './glsl/gBuffer.vs';
import gBufferFragment from './glsl/gBuffer.fs';
import { gui }from '../../utils/gui'


export default class Index {
  obj: THREE.Mesh<any, any>;
  constructor() {
    this.geometry = new THREE.OctahedronGeometry(1,0);
    this.material = new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        flatShading: true,
        metalness: 1
      });
    this.obj = new THREE.Mesh(this.geometry, this.material);
    this.time = 0;

    this.init();
  }

  init() {
    this.obj.castShadow = true;
    this.obj.receiveShadow = true;
    this.obj.position.set(0, 1.1, 0);
    this.obj.scale.set(0.7, 0.7, 0.7);
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.obj.rotateY(deltaTime);
  }

}