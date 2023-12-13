precision highp float;
uniform sampler2D inputBuffer;
uniform float nega;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(inputBuffer, vUv);
  vec4 negaColor = vec4(1.0 - color.r, 1.0 - color.g, 1.0 - color.b, 1.0);
  vec4 finalColor = mix(color, negaColor, nega);
  gl_FragColor = finalColor;
}
