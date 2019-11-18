#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main() {

	vec2 st = vTextureCoord.xy;
	

	vec4 filterGradient = vec4(abs(0.75 - distance(st, vec2(0.5, 0.5))), abs(0.75 - distance(st, vec2(0.5, 0.5))), abs(0.75 - distance(st, vec2(0.5, 0.5))), 1.0); 
	vec4 texture = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = texture * filterGradient;

	

	
	
}