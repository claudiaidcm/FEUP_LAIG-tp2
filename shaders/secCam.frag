#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeFactor;

void main() {

	/* Change the y coord to flip image */
	vec4 original = texture2D(uSampler, vec2(vTextureCoord.x, 1.0-vTextureCoord.y));	
	
	/* Apply white stripes */ 
	vec4 color;
	if(mod(vTextureCoord.y*25.0 + timeFactor*0.8, 5.0) > 1.0)
		color = vec4(original.rgb, 1.0); // normal color 
	else
		color = vec4(1, 1, 1, 1.0); //white stripes 

	/* Apply black corners' gradient */
	float d=sqrt((0.5-vTextureCoord.x)*(0.5-vTextureCoord.x)+(0.5-vTextureCoord.y)*(0.5-vTextureCoord.y));  // distance from the screen's center
	vec4 gradient=mix(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0), d*2.4); // to change between black and the original color
		
	gl_FragColor = color*gradient;
}