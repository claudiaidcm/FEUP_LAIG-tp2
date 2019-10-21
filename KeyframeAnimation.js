class KeyframeAnimation extends Animation {
    constructor(id, scene, animations) {
        this.id = id;
        this.scene = scene;
        this.animations = animations;
        this.currentTime = 0;
        this.matrix = mat4.create();
        this.animID = 0;
    };

    update() {
        
    };

    apply() {
        
    };

};