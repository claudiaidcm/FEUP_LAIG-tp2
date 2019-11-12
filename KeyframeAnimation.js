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
    this.timegap = 0;
    this.firstTime = -1;
    this.matrix = mat4.create();

    this.currentTime = 0;
    this.currentKeyTime = 0;
    this.instantTime = 0;
    this.currentTranslate = {x:0.0, y:0.0, z:0.0};
    this.currentRotate = {x:0.0, y:0.0, z:0.0};
    this.currentScale = {x:1.0, y:1.0, z:1.0};

    this.trans_X = 0;
    this.trans_Y = 0;
    this.trans_Z = 0;
    this.rot_X = 0;
    this.rot_Y = 0;
    this.rot_Z = 0;
    this.scale_X = 1;
    this.scale_Y = 1;
    this.scale_Z = 1;


    this.testi = 0;

    for (var i = 0; i < this.animations.length; i++) {
       this.instants.push(animations[i].time);
    }

  };

  update(deltaTime) {
    mat4.identity(this.matrix);
    
   if(this.oldTime==-1){
     this.oldTime=deltaTime;
     this.firstTime = deltaTime;
     return;
   }
    
    this.currentTime = deltaTime - this.firstTime;
    this.timegap = this.currentTime - this.lastTime;
    
    
    if(this.currentKeyframe == 0) {
      this.currentKeyTime = (this.currentTime)/1000
    }else{
      this.currentKeyTime = this.currentTime/1000-this.instants[this.currentKeyframe-1]
    } 
    
    this.lastTime=deltaTime;
    
    
    this.testi++;
     if (this.testi % 19430 == 0) {
      console.log("Updating Animation " + this.id + ". Current Keyframe: " + this.currentKeyframe + ". It's been " + this.currentTime/1000 + " seconds since the program has started");
      console.log("Current Keytime " + this.currentKeyTime + ". Current Interval: " + this.intervalTime + ". Instant[currentKeyframe] = " + this.instants[this.currentKeyframe] + ".");
      console.log("Trans_X " + this.trans_X + ". Trans_Y: " + this.trans_Y + ". Trans_Z: " + this.trans_Z + ".");
      console.log("currentTranslate X " + this.currentTranslate.x + ". currentTranslate Y: " + this.currentTranslate.y + ". currentTranslate Z: " + this.currentTranslate.z + ".");
    }
    
    if(this.currentKeyframe == this.animations.length) return;

   if(this.currentKeyframe > 0) {
              this.intervalTime = this.instants[this.currentKeyframe] - this.instants[this.currentKeyframe-1]
              this.trans_X = this.animations[this.currentKeyframe].trans_X - this.animations[this.currentKeyframe - 1].trans_X;
              this.trans_Y = this.animations[this.currentKeyframe].trans_Y - this.animations[this.currentKeyframe - 1].trans_Y;
              this.trans_Z = this.animations[this.currentKeyframe].trans_Z - this.animations[this.currentKeyframe - 1].trans_Z;
              this.rot_X = this.animations[this.currentKeyframe].rot_X - this.animations[this.currentKeyframe - 1].rot_X;
              this.rot_Y = this.animations[this.currentKeyframe].rot_Y - this.animations[this.currentKeyframe - 1].rot_Y;
              this.rot_Z = this.animations[this.currentKeyframe].rot_Z - this.animations[this.currentKeyframe - 1].rot_Z;
              //this.scale_X = this.animations[this.currentKeyframe].scale_X - this.animations[this.currentKeyframe - 1].scale_X;
              //this.scale_Y = this.animations[this.currentKeyframe].scale_Y - this.animations[this.currentKeyframe - 1].scale_Y;
              //this.scale_Z = this.animations[this.currentKeyframe].scale_Z - this.animations[this.currentKeyframe - 1].scale_Z;
          }
          else {
              this.intervalTime = this.instants[this.currentKeyframe];
              this.trans_X = this.animations[this.currentKeyframe].trans_X;
              this.trans_Y = this.animations[this.currentKeyframe].trans_Y;
              this.trans_Z = this.animations[this.currentKeyframe].trans_Z;
              this.rot_X = this.animations[this.currentKeyframe].rot_X;
              this.rot_Y = this.animations[this.currentKeyframe].rot_Y;
              this.rot_Z = this.animations[this.currentKeyframe].rot_Z;
              //this.scale_X = this.animations[this.currentKeyframe].scale_X;
              //this.scale_Y = this.animations[this.currentKeyframe].scale_Y;
              //this.scale_Z = this.animations[this.currentKeyframe]scale_Z;
          }



          if(this.currentTime/1000 <= this.instants[this.currentKeyframe]) {
              
              this.currentTranslate.x = (this.trans_X / this.intervalTime) * this.currentKeyTime;
              this.currentTranslate.y = (this.trans_Y / this.intervalTime) * this.currentKeyTime;
              this.currentTranslate.z = (this.trans_Z / this.intervalTime) * this.currentKeyTime;

              this.currentRotate.x = (this.rot_X / this.intervalTime) * this.currentKeyTime;
              this.currentRotate.y = (this.rot_Y / this.intervalTime) * this.currentKeyTime;
              this.currentRotate.z = (this.rot_Z / this.intervalTime) * this.currentKeyTime;

             // this.currentScale.x *= this.currentKeyTime;
             // this.currentScale.y *= this.currentKeyTime;
             // this.currentScale.z *= this.currentKeyTime;
          }




    if(this.currentKeyTime > this.intervalTime) {
      this.currentKeyframe++;
    } 
   

  };

  apply() {
    var transform = mat4.create();
    mat4.identity(transform);
    
    //Apply Transformation Matrix(s)
    //console.log("Applying Animation " + this.id);
    //if(this.currentKeyframe == 0) {
      //position = keyframe[currentKeyframe-1] + (this.currentTime/(1000*instant[this.currentKeyframe-1])) * keyframe[this.currentKeyframe];
    //} else {
      //position = keyframe[currentKeyframe-1] + (this.currentTime/(1000*instant[this.currentKeyframe-1])) * keyframe[this.currentKeyframe];
    //}


     this.scene.translate(this.currentTranslate.x, this.currentTranslate.y, this.currentTranslate.z);
     this.scene.rotate(this.currentRotate.z * Math.PI / 180, 0, 0, 1);
     this.scene.rotate(this.currentRotate.y * Math.PI / 180, 0, 1, 0);
     this.scene.rotate(this.currentRotate.x * Math.PI / 180, 1, 0, 0);
     this.scene.scale(this.currentScale.x, this.currentScale.y, this.currentScale.z);
    
  };

};
