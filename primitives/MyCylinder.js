/**
 * MyCylinder
 * @constructor
 */

class MyCylinder extends CGFobject {
    constructor(scene, id, height, base, top, slices, stacks) {
        super(scene);

        this.height = height;
        this.base = base;
        this.top = top;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    };

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        //diferença de angulo entre cada slice
        var alphaAng = 2 * Math.PI / this.slices;

        //altura de cada stack
        var heightStacks = this.height / this.stacks;

        //diferença entre o tamanho de cada slice
        var sizeSlices = (this.top - this.base) / this.stacks;
        

        //ciclo para cada triangulo
        for (var i = 0; i <= this.slices; ++i) {
            for (var j = 0; j <= this.stacks; ++j) {

                this.vertices.push(

                    //distancia do eixo ao       //anglo do eixo ao
                    //angulo a ser processado     //ponto a ser processado

                    //coordenadas do circlo trignometrico multiplicadas pelo tamanho do circulo
                    (this.base + sizeSlices * j) * Math.cos(alphaAng * i),
                    (this.base + sizeSlices * j) * Math.sin(alphaAng * i),
                    j * heightStacks
                );
   
                //desenhar o rectangulo a volta
                if (j < this.stacks && i < this.slices) {
                    this.indices.push(
                        (i + 1) * (this.stacks + 1) + j, i * (this.stacks + 1) + j + 1, i * (this.stacks + 1) + j,
                        i * (this.stacks + 1) + j + 1, (i + 1) * (this.stacks + 1) + j, (i + 1) * (this.stacks + 1) + j + 1
                    );
                }

                this.texCoords.push(
                    i * 1 / this.slices,
                    1 - (j * 1 / this.stacks)
                );

                this.normals.push(
                    Math.cos(alphaAng * i),
                    Math.sin(alphaAng * i), 0
                );
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};