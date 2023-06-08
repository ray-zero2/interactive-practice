#version 300 es

in vec3 position;
in vec3 normal;
in vec2 uv;
out vec3 vNormal;
out vec2 vUv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

void main() {
// get smooth normals
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vec3 transformedNormal = normalMatrix * normal;
  vNormal = normalize( transformedNormal );
  vUv = uv;
  gl_Position = projectionMatrix * mvPosition;
}