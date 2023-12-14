precision highp float;
uniform sampler2D inputBuffer;
uniform vec2 splitNum;
uniform vec2 resolution;
varying vec2 vUv;
varying vec2 vRatio;

#include invertColor.glsl
bool isOdd(float val) {
    return mod(val, 2.) == 1.;
}

void main() {
  vec2 index = floor(vUv.xy * splitNum);
  vec2 newUv = fract(vUv.xy * splitNum);

  vec2 uv = vec2(
    newUv.x * vRatio.x + (1. - vRatio.x) * 0.5,
    newUv.y * vRatio.y + (1. - vRatio.y) * 0.5
  );

  vec4 color = texture2D(inputBuffer, uv);
  if(isOdd(index.x + index.y)) {
    color = invertColor(color);
  }
  gl_FragColor = color;
}
