class KeyframeAnimation extends Animation {
  constructor(id, scene, animations) {
    super(scene);
    this.id = id;
    this.scene = scene;
    this.animations = animations;
    this.instants = [];
    this.maxTime = animations[animations.length-1].time;
    this.currentKeyframe = 0;
    this.oldTime = -1;
    this.firstTime = -1;
    this.matrix = mat4.create();

    this.testi = 0;

    for (var i = 0; i < this.animations.length; i++) {
       this.instants.push(animations[i].time);
    }

  };

  update(deltaTime) {
    mat4.identity(this.matrix);
    
    
     this.testi++;

    if(this.oldTime==-1){
     this.oldTime=deltaTime;
     this.firstTime = deltaTime;
     return;
   }

   var intervalTime=deltaTime-this.lastTime;
    
    this.lastTime=deltaTime;
    
     if (this.testi % 9715 == 0) {
      console.log("Updating Animation " + this.id + ". Current Keyframe: " + this.currentKeyframe + ". It's been " + (deltaTime - this.firstTime)/1000 + " seconds since the program has started");      console.log("Last Interval:" + intervalTime);
    }

    if(this.currentKeyframe == this.animations.length) return;

    if((deltaTime-this.firstTime)/1000 > this.instants[this.currentKeyframe]) {
      this.currentKeyframe++;
    } 
   

  };

  apply() {
    var transform = mat4.create();
    mat4.identity(transform);
    
    //Apply Transformation Matrix(s)
    //console.log("Applying Animation " + this.id);
    

    
  };

};
