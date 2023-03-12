#include <common>
attribute vec3 random1;
attribute vec3 random2;
attribute vec3 center;
uniform float uTime;
uniform float factor1;
uniform float factor2;


mat4 translateMatrix4(vec3 v) {
  return
    mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      v.x, v.y, v.z, 1.0
    );
}

mat4 rotate4X(float r) {
  return
    mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, cos(r), -sin(r), 0.0,
      0.0, sin(r), cos(r), 0.0,
      0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotate4Y(float r) {
  return
    mat4(
      cos(r), 0.0, sin(r), 0.0,
      0.0, 1.0, 0.0, 0.0,
      -sin(r), 0.0, cos(r), 0.0,
      0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotate4Z(float r) {
  return
    mat4(
      cos(r), -sin(r), 0.0, 0.0,
      sin(r), cos(r), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    );
}