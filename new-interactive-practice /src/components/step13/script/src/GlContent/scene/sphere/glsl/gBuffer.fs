#version 300 es

precision highp float;
precision highp int;

in vec3 vPosition;
in vec3 vNormal;

layout (location = 0) out vec3 o_position;
layout (location = 1) out vec3 o_normal;
layout (location = 2) out vec4 o_color;

uniform vec4 color;

void main(void) {
  o_position = vPosition;
  o_normal = normalize(vNormal);
  o_color = color;
}