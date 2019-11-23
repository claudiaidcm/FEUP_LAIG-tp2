#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform float timeS;
varying vec2 vTextureCoord;

void main() {

	vec2 coords = vTextureCoord.xy;
	vec2 st = vTextureCoord.xy;
	vec3 line = vec3(0.65, 0.65, 0.65);

	float ptc = 0.0;
	float number_lines = 12.0;          // number_lines represents the number of lines on screen, but the relation isn't linear
	float y_size = 15.0;
	float speed = 10.0;


	ptc = distance(st, vec2(0.5, 0.5));    

	vec4 filterGradient = vec4(abs(0.7 - ptc), abs(0.7 - ptc), abs(0.7 - ptc), 1.0); 
	vec4 texture = texture2D(uSampler, vTextureCoord);
	

	float alpha = abs(sin((coords.y * number_lines) - timeS * speed) * y_size);
	gl_FragColor = texture * filterGradient * vec4(line, alpha);

}