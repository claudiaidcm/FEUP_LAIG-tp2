/**
 * KeyframeAnimation
 * @constructor
 * @param {string} id - id of the animation
 * @param {XMLScene} scene - reference to MyScene object
 * @param {array} keyframes - array with all the keyframes if the aniamtion
 */

class KeyframeAnimation extends Animation {
  constructor(id, scene, keyframes) {
    super(scene);
    this.id = id;
    this.scene = scene;
    this.keyframes = keyframes;
    this.initialPos;
  };

  update(currentTime) {
    var animMatrixIndex = this.checkPositionInAnim(currentTime / 1000); //get index of animMatrix
    var animMatrixF = this.keyframes[animMatrixIndex].keyFrameMatrix; // matrix stored in the current keyframe
    var animMatrixI = mat4.create(); //matrix of the previous keyframe
    var deltaTime; //interval of time in which the animation should occur

    // sets deltaTime and animMatrixI depending on each animation we are in
    if (animMatrixIndex > 0) {
      deltaTime = (this.keyframes[animMatrixIndex].instant - this.keyframes[animMatrixIndex - 1].instant);
      animMatrixI = this.keyframes[animMatrixIndex - 1].keyFrameMatrix;
    }
    else {
      deltaTime = this.keyframes[animMatrixIndex].instant;
      mat4.identity(animMatrixI);
    }

    //difference between the previous and the current animMatrix
    var diffMat = mat4.create();
    this.sub(diffMat, animMatrixF, animMatrixI);

    //amount to add to change the matrices
    var deltaMat = mat4.create();
    this.mult(deltaMat, diffMat, 1/deltaTime);

    //calculates the amount to add at the current time
    var aux = mat4.create();
    this.mult(aux, deltaMat, currentTime/1000);

    //adds the amount calculated above to the matrix to apply
    var matToApply = mat4.create();
    this.add(matToApply, animMatrixI, aux);

    this.apply(matToApply);
  };

  apply(anim_matrix) {
    this.scene.multMatrix(anim_matrix);
  };

  checkPositionInAnim(time) {
    for (var i = 0; i < this.keyframes.length; i++) {
      if (time <= this.keyframes[i].instant)
        return i;
    }
  }

  //Adds two matrices
  add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];

    return out;
  };

  //Subtracts two matrices
  sub(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];

    return out;
  };

  //Multiplies a matrix by a scalar val4
  mult(out, a, value) {
    out[0] = a[0] * value;
    out[1] = a[1] * value;
    out[2] = a[2] * value;
    out[3] = a[3] * value;
    out[4] = a[4] * value;
    out[5] = a[5] * value;
    out[6] = a[6] * value;
    out[7] = a[7] * value;
    out[8] = a[8] * value;
    out[9] = a[9] * value;
    out[10] = a[10] * value;
    out[11] = a[11] * value;
    out[12] = a[12] * value;
    out[13] = a[13] * value;
    out[14] = a[14] * value;
    out[15] = a[15] * value;

    return out;
  };

};
