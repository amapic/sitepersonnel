uniform float time;
uniform vec2 uMouse;
uniform float uRatio;
uniform float  uDistance;

varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
	vec2 adjustedUV = vec2(uv.x * uRatio, uv.y);
	vec2 adjustedPos = vec2(circlePosition.x * uRatio, circlePosition.y);
	float dist = distance(adjustedPos, adjustedUV);
	return 1. - smoothstep(0.0, radius, dist);
}

float elevation(float radius, float intensity) {
	float circleShape = circle(uv, (uMouse * 0.5) + 0.5, radius);
	return circleShape * intensity;
}

void main() {
	vec3 newPosition = position;
	// if (uMouse.x != 0.0 && uMouse.y != 0.0) {
	// 	newPosition.z += elevation(0.2*(max((1000.0-uDistance)/1000.0	,0.5)	), .7);
	// }
	newPosition.z += elevation(0.2, .7);

	csm_Position = newPosition;
	vUv = uv;
}