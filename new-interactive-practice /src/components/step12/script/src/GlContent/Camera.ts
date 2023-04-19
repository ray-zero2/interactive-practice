import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera extends THREE.PerspectiveCamera {
  time: number;
  constructor(options = {}) {
    super(options?.fov, options?.aspect, options?.near, options?.far);
    this.time = 0;
    this.enableControl = options?.enableControl;

    if (!options?.canvas) return;
    if (!this.enableControl) return;
    this.controls = new OrbitControls(this, options?.canvas);
    this.controls.enableDamping = options?.enableDamping || false;
    this.controls.dampingFactor = options?.dampingFactor ?? 0.2;
    this.updateProjectionMatrix();
  }

  init() {
    this.position.set(0.039, 3.2, 6.0);
    this.lookAt(new THREE.Vector3(0, 0, -1.5));
    // this.controls.target.y = 0.0
    // this.controls.minDistance = 3
    // this.controls.maxDistance = 100;
    // this.controls.minPolarAngle = 0
    // this.controls.maxPolarAngle = Math.PI / 2 - 0.3
    // this.controls.enablePan = false
  }

  resize(resolution) {
    this.aspect = resolution.x / resolution.y;
    this.updateProjectionMatrix();
  }

  update(deltaTime: number) {
    // this.lookAt(0, 0, 0);
    // if (!this.controls) return;
    // this.controls.update();
    // console.log(this.position);
  }
}
