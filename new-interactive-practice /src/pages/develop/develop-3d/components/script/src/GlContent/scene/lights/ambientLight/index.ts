import * as THREE from 'three';
import type { Controller } from 'lil-gui';
import { gui } from '../../../utils/gui'
import { LAYER } from '../../../config';

export default class AmbientLight extends THREE.AmbientLight {
  private guiControllers: Controller[] = [];
  time: number;
  constructor(color: THREE.ColorRepresentation = "#ffffff") {
    super(color, 1);
    this.time = 0;
    this.setGui(color);
  }

  update(deltaTime: number) {
    this.time += deltaTime;
  }

  updateGui() {
    this.guiControllers.forEach(controller => controller.updateDisplay());
  }

  protected setGui(color: string | THREE.ColorRepresentation) {
    const folder = gui.addFolder(`ambientlight - ${this.id}`)
    folder.close();
    this.guiControllers.push(
      folder.add(this, 'intensity', 0, 10),
      folder.addColor({ string: color }, 'string' ).onChange((colorCode: THREE.ColorRepresentation) => this.color.set(colorCode)),
    )
  }
}