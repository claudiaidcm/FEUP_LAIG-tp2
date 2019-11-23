/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        //Show or not axis control
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.initKeys();

        return true;
    }

    //add lights to user interface
    addLights(lights) {
        var interLight = this.gui.addFolder("Lights");

        //lightsInfo -> array in which each position identifier is the light ID 
        //  and it's value is true or false (light enabled or disabled)
        for (var key in lights) {
            this.scene.lightsInfo[key] = lights[key][0];
            interLight.add(this.scene.lightsInfo, key);
        }
    }


    //add cameras to user interface
    addCameras(cameras) {
        var scene = this.scene;

        //save ids of all the cameras defined
        var id = [];
        for (var key in cameras)
            id.push(key);


        //add menu to choose camera and change cameras acording to choice
        this.interCamera = this.gui.add(this.scene, 'camera', id).name("Camera").onChange(
            value => scene.updateCamera(value));

        //set the default view
        scene.updateCamera(scene.graph.defaultView);
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () { };
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
        if (event.key == "m" || event.key == "M")
            this.scene.numMaterial++;
        this.activeKeys[event.code] = false;
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}