import * as THREE from 'three';
import Plane from './plane';
import Hosmer from './hosmer';
import SpotLight from './lights/spotlight';

export default class MainScene extends THREE.Scene {
  time: number = 0;
  plane: Plane;
  lights: {
    [x: string]: any
  };
  hosmer: Hosmer;

  constructor() {
    super();
    this.plane = new Plane(10, 10, 256 * 2, 256 * 2);
    this.add(this.plane.obj);

    // this.sphere = new Sphere();
    // this.add(this.sphere.obj);

    this.lights = {
      spot1: new SpotLight(),
      spot2: new SpotLight('#fda5b4'),
      spot3: new SpotLight('#66ffff'),
    };
    this.add(
      this.lights.spot1,
      this.lights.spot1.getHelper(),
      this.lights.spot2,
      this.lights.spot2.getHelper(),
      this.lights.spot3,
      this.lights.spot3.getHelper()
    );
    this.hosmer = new Hosmer();
    this.hosmer.init()
      .then(() => {
        this.add(this.hosmer.obj);
      });
  }

  init() {
    this.setLights();
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    Object.values(this.lights).forEach(light => light.update(deltaTime));
    this.plane!.update(deltaTime);
  }

  setLights() {
    const {spot1, spot2, spot3} = this.lights;
    spot1.angle = 1.5707963267948966;
    spot1.distance = 50;
    spot1.position.set(0, 3, 4);
    spot1.penumbra = 0.628318530717959;
    spot1.decay = 2;
    spot1.updateGui();

    spot2.angle = 0.80285;
    spot2.distance = 26;
    spot2.position.set(-8, 2, -5);
    spot2.penumbra = 0.52;
    spot2.decay = 2.5;
    spot2.updateGui();

    spot3.angle = 0.94;
    spot3.distance = 19;
    spot3.position.set(7, 7, -2);
    spot3.penumbra = 1;
    spot3.decay = 0.95;
    spot3.updateGui();
  }
}