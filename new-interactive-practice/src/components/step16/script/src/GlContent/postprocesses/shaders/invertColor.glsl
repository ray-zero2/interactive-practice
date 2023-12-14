vec4 invertColor(vec4 color) {
  vec4 negaColor = vec4(1.0 - color.r, 1.0 - color.g, 1.0 - color.b, 1.0);
  return negaColor;
}

