uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uRatio;
varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
	vec2 adjustedUV = vec2(uv.x * uRatio, uv.y);
	vec2 adjustedPos = vec2(circlePosition.x * uRatio, circlePosition.y);
	float dist = distance(adjustedPos, adjustedUV);
	return 1. - smoothstep(0.0, radius, dist);
}

void main() {
	vec4 finalTexture = texture2D(uTexture, vUv);
	csm_DiffuseColor = finalTexture;
}