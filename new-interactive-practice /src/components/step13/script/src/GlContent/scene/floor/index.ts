import * as THREE from 'three';

export class Floor {
  obj: THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
  time: number = 0;

  constructor() {
    this.obj = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50, 2, 2),
      new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide })
    ); 

    this.obj.visible = false;

    this.init();
  }

  init() {
    this.obj.rotateX(Math.PI / 2);
    this.obj.receiveShadow = true;
  }

  update(deltaTime: number) {
    this.time += deltaTime;
  }
}