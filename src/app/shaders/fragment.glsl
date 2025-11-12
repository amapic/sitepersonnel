uniform float uOpacity;
uniform float uDeepPurple;
uniform float uCaca;
 
varying float vDistortion;
varying vec2 vScreenPosition;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
  
}     
 
void main() {
  float distort = vDistortion * 3.;

  // Bleu avec variations mais jamais noir
  vec3 brightness = vec3(0., 0., 0.5);  // Base bleu plus élevé
  vec3 contrast = vec3(0., 0., 0.);    // Contraste réduit pour éviter le noir
  vec3 oscilation = vec3(0., 0., 1.);
  vec3 phase = vec3(0., 0., 0.);
 
  vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
  
  // Garantir un minimum de bleu partout
  float minBlue = 0.3;
  vec3 finalColor = vec3(0., 0., max(color.b + 0.2, minBlue));
  
  // vScreenPosition.y va de 0 (haut) à 1 (bas)
  // On veut que les points passent au blanc quand ils sont recouverts par la section 1
  // La section 1 commence quand uCaca > 0 et progresse vers le haut de l'écran
  // Un point au milieu de l'écran (vScreenPosition.y = 0.5) doit changer quand uCaca = 0.5
  
  // Position Y inversée (1 = haut, 0 = bas) pour correspondre au scroll
  float posY = 1.0 - vScreenPosition.y;
  
  // Si la position du point est inférieure au scroll progress, il devient blanc
  if (posY > 1.-uCaca) {
   finalColor = vec3(1., 1., 1.); // Blanc
  }
   //finalColor = vec3(1., 1., 1.); // Blanc

  
  
  gl_FragColor = vec4(finalColor, 0.75);
}
