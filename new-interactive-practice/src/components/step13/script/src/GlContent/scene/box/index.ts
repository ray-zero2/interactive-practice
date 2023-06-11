import * as THREE from 'three';
import boxVs from './shader/box.vs'
import boxFs from './shader/box.fs'
export class Box {
  uniforms: { [uniform: string]: THREE.IUniform };
  obj: THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
  time: number = 0;

  constructor() {
    this.uniforms = {
      uTime: { value: 0 }
    }
    this.obj = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      // new THREE.MeshStandardMaterial({ color: '#ff0000', side: THREE.BackSide })
      new THREE.RawShaderMaterial({
        side: THREE.BackSide,
        uniforms: this.uniforms,
        vertexShader: boxVs,
        fragmentShader: boxFs,
      })
    );

    this.init();
  }

  init() {
    this.obj.position.set(0, 5, 0);
    this.obj.castShadow = true;
    this.obj.receiveShadow = true;
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    this.uniforms.uTime.value = this.time;
    this.obj.rotateY(deltaTime * .2);
  }
}