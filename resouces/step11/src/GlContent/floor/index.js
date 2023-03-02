import * as THREE from "three";

export default class Index {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(30,30);
    this.material = new THREE.MeshPhongMaterial({color: 0x6699FF});

    this.obj = new THREE.Mesh(this.geometry, this.material);
    this.time = 0;
    this.init();
  }

  init() {
    this.obj.receiveShadow = true
    this.obj.rotateX(-Math.PI/2);
    this.obj.translateZ(-2);
  }

  update(deltaTime) {
    this.time += deltaTime;
  }
}