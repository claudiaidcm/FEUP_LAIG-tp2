/**
 * Plane
 * @constructor
 * @param {XMLScene} scene - represents the CGFscene
 * @param {number}   npartsU - number of division of the NURBS object in the u coordinate
 * @param {number}   npartsV - number of division of the NURBS object in the v coordinate
 */

class Plane extends CGFobject {
  constructor(scene, npartsU, npartsV) {
    super(scene);
    this.npartsU = npartsU;
    this.npartsV = npartsV;
    this.init();
  };

  init() {
    this.controlvertexes = [ // U = 0
      [ // V = 0..1;
        [-0.5, 0, 0.5, 1],
        [-0.5, 0, -0.5, 1]
      ],
      // U = 1
      [ // V = 0..1
        [0.5, 0, 0.5, 1],
        [0.5, 0, -0.5, 1]
      ]
    ];

    this.nurbsSurface = new CGFnurbsSurface(1, 1, this.controlvertexes);
    this.obj = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, this.nurbsSurface);
  };

  display() {
    this.obj.display();
  };
};
