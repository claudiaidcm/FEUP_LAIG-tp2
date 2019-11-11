class Keyframe {
  constructor(scene, time, trans_X, trans_Y, trans_Z, rot_X, rot_Y, rot_Z, scale_X, scale_Y, scale_Z) {
    this.scene = scene;
    this.time = time;

    var transform = mat4.create();
    mat4.identity(transform);

    this.trans_X = trans_X;
    this.trans_Y = trans_Y;
    this.trans_Z = trans_Z;
    this.trans_Vector = vec3.fromValues(trans_X, trans_Y, trans_Z);

    transform = mat4.translate(transform, transform, this.trans_Vector);


    this.rot_X = rot_X;
    this.rot_Y = rot_Y;
    this.rot_Z = rot_Z;
    this.trans_Vector = vec3.fromValues(rot_X, rot_Y, rot_Z);

    transform = mat4.rotate(transform, transform, rot_X * scene.DEGREE_TO_RAD, [1, 0, 0]);
    transform = mat4.rotate(transform, transform, rot_Y * scene.DEGREE_TO_RAD, [0, 1, 0]);
    transform = mat4.rotate(transform, transform, rot_Z * scene.DEGREE_TO_RAD, [0, 0, 1]);


    this.scale_X = scale_X;
    this.scale_Y = scale_Y;
    this.scale_Z = scale_Z;
    this.scale_Vector = vec3.fromValues(scale_X, scale_Y, scale_Z);

    transform = mat4.scale(transform, transform, this.scale_Vector);

  };
}
