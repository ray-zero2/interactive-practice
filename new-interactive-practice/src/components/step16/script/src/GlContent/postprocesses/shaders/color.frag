precision highp float;
uniform sampler2D inputBuffer;
uniform float nega;
varying vec2 vUv;

#include invertColor.glsl

void main() {
  vec4 color = texture2D(inputBuffer, vUv);
  vec4 negaColor = invertColor(color);
  vec4 finalColor = mix(color, negaColor, nega);
  gl_FragColor = finalColor;
}
