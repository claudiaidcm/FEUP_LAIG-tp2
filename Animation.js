class Animation {
    constructor(id, scene, time) {
        if (this.constructor === Animation) {
            throw new TypeError('Abstract class "Animation" cannot be instantiated directly.'); 
        }
        this.id = id;
        this.scene = scene;
        this.time = time;
    };

    update() {
        console.log("Error, can't call function in abstract class");
    };

    apply() {
        console.log("Error, can't call function in abstract class");
    };

};