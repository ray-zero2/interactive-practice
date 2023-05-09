import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import hosmer_model  from './model/hosmer_draco.gltf?url';
import type * as THREE from 'three';


export default class Index {
  obj: any;
  time: number;
  constructor() {
    // this.geometry = new THREE.OctahedronGeometry(1,0);
    // this.material = new THREE.MeshStandardMaterial({
    //     side: THREE.FrontSide,
    //     flatShading: true,
    //     metalness: 1
    //   });
    // this.obj = new THREE.Mesh(this.geometry, this.material);
    this.time = 0;
  }

  init(scene: THREE.Scene) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/assets/libs/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(hosmer_model, (gltf) => {
      console.log('gltf', gltf);
      const obj = gltf.scene;
      const scale = 0.05;
      obj.scale.set(scale*obj.scale.x, scale*obj.scale.y, scale * obj.scale.z)
      this.obj = obj;
      this.obj.position.set(0, 2.5, 0);
      scene.add(this.obj);
    });
    // this.obj.castShadow = true;
    // this.obj.receiveShadow = true;

    // this.obj.scale.set(0.7, 0.7, 0.7);
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    // this.obj.rotateY(deltaTime);
  }

}