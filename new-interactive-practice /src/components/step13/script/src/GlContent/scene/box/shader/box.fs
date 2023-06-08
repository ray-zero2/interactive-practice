precision highp float;
uniform float uTime;
varying vec2 vUv;

const float ROW_NUM = 60.;
const float COLUMN_NUM = 150.;
const float speed = 100.;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float barcode(vec2 uv, vec2 velocoity) {
  vec2 pos = floor(uv+velocoity);
  return step(0.5, random(120. + pos * .000002) + random(pos) * 0.5);
}

vec3 ryojiPattern() {
  float _uTime = uTime * speed;

  vec2 uv = vUv;
  uv *= vec2(COLUMN_NUM, ROW_NUM);

  vec2 direction = vec2(1., .0);
  vec2 velocoity = vec2(_uTime) * direction * random(vec2(floor(uv.y), .0));
  vec3 color = vec3(barcode(uv,velocoity));

  return 1.0 - color;
}

void main() {
  vec3 color = ryojiPattern();

  // edge
  float valueX = min(
    smoothstep(.0, .2, vUv.x),
    smoothstep(.0, .2, 1.-vUv.x)
  );
  float valueY = min(
    smoothstep(.0, .2, vUv.y),
    smoothstep(.0, .2, 1.-vUv.y)
  );
  color *= vec3(min(valueX, valueY));

  // value
  gl_FragColor = vec4(color,1.0);
}
