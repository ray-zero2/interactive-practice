#version 300 es

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;

out vec3 vPosition;
out vec3 vNormal;

uniform mat4 modelMatrix;
uniform mat4 normalMatrix;
uniform mat4 mvpMatrix;

void main(void) {
  vec4 position = vec4(position, 1.0);
  vPosition = (modelMatrix * position).xyz;
  vNormal = (normalMatrix * vec4(normal, 0.0)).xyz;
  gl_Position = mvpMatrix * position;
}