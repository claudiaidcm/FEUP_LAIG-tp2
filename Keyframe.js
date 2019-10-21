class Keyframe{
    constructor(id, scene, time, trans_X, trans_Y, trans_Z, rot_X, rot_Y, rot_Z, scale_X, scale_Y, scale_Z) {
        this.id = id;
        this.scene = scene;
        this.time = time;
        
        this.trans_X = trans_X;
        this.trans_Y = trans_Y;
        this.trans_Z = trans_Z;
        this.trans_Vector = vec3.fromValues(trans_X,trans_Y,trans_Z);

        this.rot_X = rot_X;
        this.rot_Y = rot_Y;
        this.rot_Z = rot_Z;
        quat4.fromEuler(this.rot_Vector, rot_X, rot_Y, rot_Z)

        this.scale_X = scale_X;
        this.scale_Y = scale_Y;
        this.scale_Z = scale_Z;
        this.scale_Vector = vec3.fromValues(scale_X,scale_Y,scale_Z);

        var transform = mat4.create();
        mat4.identity(transform);
        
        fromRotationTranslationScale(transform, this.rot_Vector, this.trans_Vector, this.scale_Vector)

        
    };




}