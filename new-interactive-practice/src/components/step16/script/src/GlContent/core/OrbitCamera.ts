import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gui } from "../utils/gui";
import gsap from 'gsap';

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
  length: number;
  beatCount: number;
  constructor(cameraOptions: CameraOptions, orbitOptions: OrbitOptions) {
    const camera = new THREE.PerspectiveCamera(cameraOptions?.fov, cameraOptions?.aspect, cameraOptions?.near, cameraOptions?.far);
    super(camera, orbitOptions.canvas);
    this.beatCount = 0;
    this.init();
    this.setGui();
  }

  get distance() {
    return this.getCamera().position.distanceTo(this.getLookAtPosition());
  }

  getCamera() {
    return this.object as THREE.PerspectiveCamera;
  }

  getLookAtPosition() {
    return this.target as THREE.Vector3;
  }

  init() {
    this.enabled = false;
    this.enableDamping = true;
    this.dampingFactor = 0.05;
    this.minDistance = 0.1
    this.maxDistance = 1000;
    // this.minPolarAngle = Math.PI - 0.5;
    // this.maxPolarAngle = Math.PI;
    this.enablePan = false;
    this.enableZoom = false;
    this.enableRotate = true;
    this.object.position.set(-10, 5, 5);
    this.target.set(0, 0, 0);

    const camera = this.getCamera();
    const currentPos = camera.position.clone();
    this.length = currentPos.length();
  }

  resize(resolution: {x: number, y: number}) {
    const camera = this.getCamera();
    camera.aspect = resolution.x / resolution.y;
    camera.updateProjectionMatrix();
  }

  setGui() {
    const folder = gui.addFolder(`OrbitCamera - ${this.object.id}`);
    folder.add(this, 'enabled').listen();
    folder.add(this.object.position, 'x').name('positionX').listen();
    folder.add(this.object.position, 'y').name('positionY').listen();
    folder.add(this.object.position, 'z').name('positionZ').listen();
    folder.add(this.target, 'x').name('lookAt X').listen();
    folder.add(this.target, 'y').name('lookAt Y').listen();
    folder.add(this.target, 'z').name('lookAt Z').listen();
    folder.close();
  }

  shake() {
    this.beatCount += 1;
    if(this.beatCount % 2 === 0) return;
    const camera = this.getCamera();

    const randomPos =
    new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1)
      .normalize().multiplyScalar(this.length);

    gsap.to(camera.position, {
      x: randomPos.x,
      y: randomPos.y,
      z: randomPos.z,
      duration: 0.8,
      ease: 'power4.inOut',
    })

  }
}
