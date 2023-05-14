import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gui } from "../utils/gui";

type CameraOptions = {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
}
type ExcludedDomElement<T> = Exclude<T, 'domElement'>;
type OrbitOptions = {
  [x in ExcludedDomElement<keyof OrbitControls>]?: OrbitControls[x];
} & { canvas: HTMLCanvasElement };

export class OrbitCamera extends OrbitControls {
  constructor(cameraOptions: CameraOptions, orbitOptions: OrbitOptions) {
    const camera = new THREE.PerspectiveCamera(cameraOptions?.fov, cameraOptions?.aspect, cameraOptions?.near, cameraOptions?.far);
    super(camera, orbitOptions.canvas);
    this.init();
    this.setGui();
  }

  getCamera() {
    return this.object as THREE.PerspectiveCamera;
  }

  getLookAtPosition() {
    return this.target as THREE.Vector3;
  }

  init() {
    this.enableDamping = true;
    this.dampingFactor = 0.05;
    this.minDistance = 0.1
    this.maxDistance = 1000;
    // this.minPolarAngle = 0
    // this.maxPolarAngle = Math.PI / 2 - 0.3
    // this.enablePan = false
    this.object.position.set(0, 1.5, 7.5);
    this.target.set(0, 3.5, 0);
  }

  resize(resolution: {x: number, y: number}) {
    const camera = this.getCamera();
    camera.aspect = resolution.x / resolution.y;
    camera.updateProjectionMatrix();
  }

  setGui() {
    const folder = gui.addFolder(`OrbitCamera - ${this.object.id}`);
    folder.add(this.object.position, 'x').name('positionX').listen();
    folder.add(this.object.position, 'y').name('positionY').listen();
    folder.add(this.object.position, 'z').name('positionZ').listen();
    folder.add(this.target, 'x').name('lookAt X').listen();
    folder.add(this.target, 'y').name('lookAt Y').listen();
    folder.add(this.target, 'z').name('lookAt Z').listen();
    folder.close();
  }
}