#ifdef GL_ES
precision highp float;
#endif
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;
varying vec3 vertex;

void main() {
	vec3 vertex = aVertexPosition;
	vertex.x *= 0.5;
	vertex.x += 0.5;
	vertex.y *= 0.5;
	vertex.y += -1.0;

	gl_Position = vec4(vertex, 1.0);

	vTextureCoord = aTextureCoord;
}