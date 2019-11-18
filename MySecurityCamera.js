
class MySecurityCamera extends CGFobject {
	constructor(scene) {
		super(scene);
		
        this.newView = new MyReverseRectangle(scene, 0, 1, 1, 0);
        //this.cameraB;

        this.shader = new CGFshader(this.scene.gl, "MySecurityCamera.vert", "MySecurityCamera.frag");
        this.shader.setUniformsValues({uSampler: 0 });
        this.shader.setUniformsValues({h_res: this.scene.gl.canvas.width});
        this.shader.setUniformsValues({v_res: this.scene.gl.canvas.heigth});
        
		this.initBuffers();
    }
    
    display() {

       this.scene.setActiveShader(this.shader);     // activate selected shader
       this.scene.pushMatrix();
       this.scene.securityView.bind(0);              // bind RTTtexture
       this.newView.display();                 //display retangle
       this.scene.popMatrix();
    }
}