#version 300 es

precision highp float;
precision highp int;

layout(location = 0) out vec4 gColor;
layout(location = 1) out vec4 gNormal;

in vec3 vNormal;
in vec2 vUv;

void main() {
  gColor = vec4(vUv, .0, 1.0);
  gNormal = vec4( normalize( vNormal ), 0.0 );
}