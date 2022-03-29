uniform vec3 iResolution;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;

  fragColor = vec4(uv, 1.0, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
