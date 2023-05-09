import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { coreStore } from './CoreStore';
import { CORE_STORE_KEY, LAYER } from '../config';
import { gui }from '../utils/gui';

export class Camera extends THREE.PerspectiveCamera {
  time: number;
  controls: any;
  lookAtPosition: THREE.Vector3;
  constructor(options = {}) {
    super(options?.fov, options?.aspect, options?.near, options?.far);
    this.time = 0;
    this.lookAtPosition = new THREE.Vector3(0, 0, 0);
    this.enableControl = options?.enableControl;

    if (!options?.canvas) return;
    if (!this.enableControl) return;
    this.controls = new OrbitControls(this, options?.canvas);
    this.controls.enableDamping = options?.enableDamping || false;
    this.controls.dampingFactor = options?.dampingFactor ?? 0.2;
    this.updateProjectionMatrix();
  }

  init() {
    this.position.set(0, 4, -8.0);
    this.lookAt(new THREE.Vector3(0, 6, 0));
    this.controls.target.y = 0.0
    this.controls.minDistance = 3
    this.controls.maxDistance = 100;
    this.controls.minPolarAngle = 0
    this.controls.maxPolarAngle = Math.PI / 2 - 0.3
    // this.controls.enablePan = false
    const folder = gui.addFolder(`mainCamera - ${this.id}`)
    folder.close();
    folder.add(this.position, 'x').min(-500).max(500).step(1).listen();
    folder.add(this.position, 'y').min(-500).max(500).step(1).listen();
    folder.add(this.position, 'z').min(-500).max(500).step(1).listen();

    coreStore.setObject(CORE_STORE_KEY.mainCamera, this);
  }

  resize(resolution: {x: number, y: number}) {
    this.aspect = resolution.x / resolution.y;
    this.updateProjectionMatrix();
  }

  update(deltaTime: number) {
    // this.lookAt(0, 0, 0);
    if (!this.controls) return;
    this.controls.update();
    // console.log(this.position);
  }
}
