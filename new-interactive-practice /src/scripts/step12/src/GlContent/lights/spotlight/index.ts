import * as THREE from 'three';
import gui from '../../utils/gui'

export default class SpotLight extends THREE.SpotLight {
  constructor(color = "#ffffff") {
    super(color, 2);
    this.angle = 20;
    this.penumbra = 0.4;
    this.decay = 2;
    this.distance = 50;
    this._helper = new THREE.SpotLightHelper( this );
    this.time = 0;
    this.position.set(
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10) );

    this.castShadow = true;
    this.shadow.autoUpdate = true;

    // this.shadow.camera.near = 0.1;
    // this.shadow.camera.far = 30;
    this.shadow.mapSize.width = 1024;
    this.shadow.mapSize.height = 1024;
    this.init();
    this.setGui();
  }

  init() {
  }

  getHelper() {
    return this._helper;
  }

  update(deltaTime) {
    this.time += deltaTime;
    this._helper.update();
  }

  setGui() {
    const folder = gui.addFolder(`spotlight - ${this.id}`)
    folder.add(this._helper, 'visible');
    folder.add(this, 'angle').min(0).max(Math.PI/2).step(Math.PI/90);
    folder.add(this, 'distance').min(1).max(180).step(1);
    folder.add(this.position, 'x').min(-50).max(50).step(1);
    folder.add(this.position, 'y').min(-50).max(50).step(1);
    folder.add(this.position, 'z').min(-50).max(50).step(1);
    folder.add(this, 'penumbra').min(0).max(1).step(0.01);
    folder.add(this, 'decay').min(0).max(5).step(0.01);;
      // .onChange(() => {
      //   this.lookAt(new THREE.Vector3(0, 0, 0));
      //   this._helper.update();
      // });
    // folder.add(dofEffect, 'bokehScale').min(0).max(20).step(0.5)
    // folder
    //   .add(dofEffect.circleOfConfusionMaterial, 'focalLength')
    //   .min(0.01)
    //   .max(0.15)
    //   .step(0.01)
  }
}