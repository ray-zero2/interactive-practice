#include <begin_vertex>

float timeScale = 0.2;
float amplitute = .5;
float _noise = (snoise(transformed + uTime * timeScale) + 1.) * .5;
float noiseEffect = _noise * amplitute;

vec2 uvCenter = vec2(0.5);
float dist = length(uvCenter - uv);
float waveTimeScale = .9;
float waveScale = 50.;
float waveDiffuse = .5;
float waveEffect = max(smoothstep(0.4, 1., sin(dist * waveScale - uTime * waveTimeScale)), waveDiffuse);

float effect =
  (waveEffect * (1. - dist))
  * noiseEffect
  * .7;

transformed += vec3(.0, .0,  effect);