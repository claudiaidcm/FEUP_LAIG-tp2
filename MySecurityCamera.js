/**
 * MySecurityCamera
 * @constructor
 * @param {XMLScene} scene - reference to MyScene object
 */

class MySecurityCamera extends CGFobject {
    constructor(scene) {
        super(scene);

        this.securCam = new MyRectangle(this.scene, 0.5, 1, -1, -0.5);
        this.shader = new CGFshader(this.scene.gl, "/shaders/secCam.vert", "/shaders/secCam.frag");
    }

    updateTimeFactor(currentTime) {
        this.shader.setUniformsValues({ timeFactor: currentTime });
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.secCamTexture.bind(0);
        this.securCam.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}
