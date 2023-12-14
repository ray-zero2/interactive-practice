attribute vec3 position;
attribute vec2 uv;

uniform vec2 splitNum;
uniform vec2 resolution;

varying vec2 vUv;
varying vec2 vRatio;

void main() {
  vec2 splitedResolution = resolution / splitNum;

  vec2 ratio = vec2(
    min((splitedResolution.x / splitedResolution.y) / (resolution.x / resolution.y), 1.0),
    min((splitedResolution.y / splitedResolution.x) / (resolution.y / resolution.x), 1.0)
  );

  vRatio = ratio;
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}
