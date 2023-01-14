precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform sampler2D tex1; //mask
uniform sampler2D tex2; // human
varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec4 mask = texture2D(tex1, vUv);
    vec4 invertMask = vec4(1.) - mask;

    vec4 peopleTex = texture2D(tex2, vUv);
    vec2 randomUv = vec2(rand(vUv.xy + uTime), rand(vUv.yx + uTime));
    vec4 randomPeopleTex = texture2D(tex2, randomUv);

    vec4 maskedImage = peopleTex * mask;
    vec4 noisePeople = randomPeopleTex * invertMask;
    vec4 noiseImage = maskedImage + noisePeople;

    vec4 finalColor = mix(peopleTex,noiseImage, clamp((2. * abs(cos(uTime * 42.2) + sin(uTime * 14.1))) , 0., 1.));
    gl_FragColor = finalColor;
}