#version 300 es
precision highp float;
uniform sampler2D normalTex;
uniform sampler2D colorTex;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec4 normalColor = texture(normalTex, vUv);
  vec4 color = texture(colorTex, vUv);
  fragColor = normalColor;
  fragColor.a = 1.;
}