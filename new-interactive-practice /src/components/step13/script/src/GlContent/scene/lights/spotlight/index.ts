import * as THREE from 'three';
import type { Controller } from 'lil-gui';
import { gui } from '../../../utils/gui'
import { LAYER } from '../../../config';

export default class SpotLight extends THREE.SpotLight {
  private _helper: THREE.SpotLightHelper;
  private guiControllers: Controller[] = [];
  time: number;
  lookAtPosition: THREE.Vector3;
  constructor(color: THREE.ColorRepresentation = "#ffffff") {
    super(color, 2);
    this.angle = 20;
    this.penumbra = 0.4;
    this.decay = 2;
    this.distance = 50;
    this.lookAtPosition = new THREE.Vector3(0, 0, 0);
    this._helper = new THREE.SpotLightHelper( this );
    this._helper.layers.set(LAYER.helper);
    this._helper.visible = false;
    this.time = 0;
    this.position.set(
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10) );
    this.lookAt(this.lookAtPosition);
    this.castShadow = true;
    this.shadow.autoUpdate = true;

    // this.shadow.camera.near = 0.1;
    // this.shadow.camera.far = 30;
    this.shadow.mapSize.width = 1024;
    this.shadow.mapSize.height = 1024;
    this.setGui(color);
  }


  lookAt(vector: THREE.Vector3): void;
  lookAt(x: number, y: number, z: number): void;
  lookAt(x: unknown, y?: unknown, z?: unknown): void {
    if (x instanceof THREE.Vector3) {
      this.lookAtPosition = x;
      super.lookAt(x);
    } else {
      this.lookAtPosition.set(x as number, y as number, z as number);
      super.lookAt(this.lookAtPosition);
    }
  }


  getHelper() {
    return this._helper;
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    this._helper.update();
  }

  updateGui() {
    this.guiControllers.forEach(controller => controller.updateDisplay());
  }

  protected control() {
    console.log(this);
  }

  protected setGui(color: string | THREE.ColorRepresentation) {
    const folder = gui.addFolder(`spotlight - ${this.id}`)
    folder.close();
    this.guiControllers.push(
      folder.add(this._helper, 'visible'),
      folder.add(this, 'angle').min(0).max(Math.PI/2).step(Math.PI/90),
      folder.add(this, 'distance').min(1).max(180).step(1),
      folder.add(this.position, 'x').name('positionX').min(-100).max(100).step(1),
      folder.add(this.position, 'y').name('positionY').min(-100).max(100).step(1),
      folder.add(this.position, 'z').name('positionZ').min(-100).max(100).step(1),
      folder.add(this, 'penumbra').min(0).max(1).step(0.01),
      folder.add(this, 'decay').min(0).max(5).step(0.01),
      folder.addColor({ string: color }, 'string' ).onChange((colorCode: THREE.ColorRepresentation) => this.color.set(colorCode)),
      folder.add(this,  'control')
    )
  }
}