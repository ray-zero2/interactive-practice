precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform sampler2D tex1;
uniform sampler2D tex2;
varying vec2 vUv;

void main() {
    vec4 shapeColor = texture2D(tex2, vUv);
    float verticalLine = texture2D(tex1, vUv + vec2(shapeColor.g * 0.005)).g;
    float horizontalLine = texture2D(tex1, vUv + vec2(shapeColor.r * 0.005)).r;
    gl_FragColor = vec4(vec3(verticalLine+horizontalLine), .7);
}