precision highp float;
uniform sampler2D inputBuffer;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(inputBuffer, vUv);
  gl_FragColor = color;
}
