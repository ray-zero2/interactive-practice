#include <project_vertex>

float _uTime = uTime * .4;

mat4 translateSelfMat1 = translateMatrix4(
  normalize(normal) * vec3(random1.x) * .2
  + normalize(normal) * .2 * ((sin((uTime * random1.y + random1.z) * 4.) + 1.) * .5)
);
// mat4 translateSelfMat2 = translateMatrix4(
//   // normalize(normal) * 1.5

// );
mvPosition = vec4(transformed, 1.);

vec4 centeredPosition = vec4(transformed - normal , 1.0);
mat4 rotateSelfMat = rotate4Z(_uTime * random1.y) * rotate4X(_uTime * random1.x) * rotate4Z(_uTime * random1.z);
mat4 translateToOrigin = translateMatrix4(normal);

vec4 mvPosition1 = translateToOrigin * rotateSelfMat * centeredPosition;
vec4 finalPosition1 = translateSelfMat1 * mvPosition1;
// vec4 mvPosition2 = translateSelfMat2 * mvPosition;

vec4 finalMvPos = mix(mvPosition, finalPosition1, factor1);
// vec4 finalMvPos = mix(finalMvPos1, mvPosition1, pow(sin(factor1 * 3.1415), 10.));

mvPosition = modelViewMatrix * finalMvPos;
gl_Position = projectionMatrix * mvPosition;