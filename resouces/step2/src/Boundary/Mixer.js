import { Renderer, Program, Color, Mesh, Triangle, Texture } from 'ogl';
import vertex from './vertex.glsl?raw';
import fragment from './fragment.glsl?raw';

export default class Mixer {
  constructor(canvas) {
    this.renderer = new Renderer({
      canvas,
      width: canvas.width,
      height: canvas.height,
      alpha: true,
      antialias: true
     })
    this.gl = this.renderer.gl;
    this.geometry = new Triangle(this.gl);

    const texOption = {
      generateMipmaps: false,
      width: canvas.width,
      height: canvas.height,
    }
    this.textures = [
      new Texture(this.gl, texOption),
      new Texture(this.gl, texOption)
    ];

    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(0.3, 0.2, 0.5) },
          tex1: { value: this.textures[0] },
          tex2: { value: this.textures[1] },
      },
    })
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.time = 0;
    this.images = {};
  }

  setSize(width, height) {
    this.renderer.setSize(width, height);
    this.gl.canvas.style.width="100%";
    this.gl.canvas.style.height="100%";
  }

  setTextureImage(image, index) {
    this.textures[index].image = image;
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.program.uniforms.uTime.value = this.time;
  }

  draw() {
    this.renderer.render({ scene: this.mesh });
  }
}