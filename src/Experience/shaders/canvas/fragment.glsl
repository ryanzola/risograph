#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform vec3 iResolution;
uniform vec3 uLightColor;
uniform vec3 uColor;
uniform float uLightIntensity;
uniform float uNoiseScale;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vSurfaceToLight;
varying vec2 vUv;

vec3 light_reflection(vec3 lightColor) {
  // AMBIENT is just the light's color
  vec3 ambient = lightColor;

  // DIFFUSE calculations
  // Calculate the cosine of the angle between the vertex's normal
  // vector as well as the vector going to the light
  vec3 diffuse = lightColor * max(dot(vSurfaceToLight, vNormal), 0.0);

  // combine
  return ambient + diffuse;
}

void main() {
  // grain
  vec2 uv = gl_FragCoord.xy;
  uv /= uNoiseScale;

  vec3 light_value = light_reflection(uLightColor);
  light_value *= uLightIntensity;

  vec3 colorNoise = vec3(snoise2(uv) * 0.5 + 0.5);
  colorNoise *= pow(light_value.r, 5.0);

  gl_FragColor.r = max(colorNoise.r, uColor.r);
  gl_FragColor.g = max(colorNoise.g, uColor.g);
  gl_FragColor.b = max(colorNoise.b, uColor.b);
  gl_FragColor.a = 1.0;
}
