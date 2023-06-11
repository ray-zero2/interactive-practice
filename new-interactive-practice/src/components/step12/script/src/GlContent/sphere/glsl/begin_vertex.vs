#include <begin_vertex>

float _factor1 = 1.;  //factor1;

vec3 transformed1 = transformed;
vec3 transformed2 = transformed;

vec3 transformed3 = transformed;
                    //  + normalize(normal) * 2.;
                    // + normalize(normal) * vec3(random1.x) * _factor1
                    // + normalize(normal) * .2 * ((sin((uTime * random1.y + random1.z) * 4.) + 1.) * .5);

transformed = transformed3;
// vec3 curlTransformed = texture2D( texturePosition, uv ).xyz;
// // transformed = mix(transformed, curlTransformed, uCurlFactor);
// transformed += curlTransformed;