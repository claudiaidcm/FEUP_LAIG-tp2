class KeyframeAnimation extends Animation {
    constructor(id, scene, time, animations) {
        this.id = id;
        this.scene = scene;
        this.time = time;
        this.animations = animations;
        this.animID = 0;
        this.maxTime = 0;
        this.timeLastAnim = 0;
        this.matrix = mat4.create();
        
        for(var i=0; i < animations.length;i++){
            this.maxTime+=this.scene.graph.animations[animations[i]].totalTime;
        }

    };

    update(deltaTime) {
        mat4.identity(this.matrix);

        var currentAnimation=this.scene.graph.animations[this.animations[this.animID]];

        if((deltaTime - this.timeLastAnim) > currentAnimation.totalTime){
            this.animID++;
            this.timeLastAnim += currentAnimation.totalTime;
        }
        else{
            currentAnimation.update(deltaTime);
            this.matrix=currentAnimation.matrix;
        }
    };

    apply() {
        var transform = mat4.create();
        mat4.identity(transform);


        fromRotationTranslationScale(transform, q, v, s)
    };

};