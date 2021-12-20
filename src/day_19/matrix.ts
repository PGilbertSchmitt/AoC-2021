// In order to provide all valid matrix transformations, I'll use all 4 rotations
// of the z-axis, and map those to all x-axis rotations and 2 90-degree y-axis rotations
// This could be overkill, but I don't know linear algebra all that well, so too bad.

import { reduce } from "ramda";
import { Point } from './inputs';

export type Matrix = [number, number, number, number, number, number, number, number, number];

// The transformation is a 2-tuple containing a matrix and a vector in the order they
// need to be applied to one point to convert it to another
// This tuple will be mapped by the scanner ID that needs these transformations applied.
export type Transformation = [Matrix, Point] | [Point, Matrix];

const combineMatrices = (a: Matrix, b: Matrix): Matrix => {
  const [a1, b1, c1,
         d1, e1, f1,
         g1, h1, i1] = a;

  const [a2, b2, c2,
         d2, e2, f2,
         g2, h2, i2] = b;

  return [
    (a1*a2)+(b1*d2)+(c1*g2), (a1*b2)+(b1*e2)+(c1*h2), (a1*c2)+(b1*f2)+(c1*i2),
    (d1*a2)+(e1*d2)+(f1*g2), (d1*b2)+(e1*e2)+(f1*h2), (d1*c2)+(e1*f2)+(f1*i2),
    (g1*a2)+(h1*d2)+(i1*g2), (g1*b2)+(h1*e2)+(i1*h2), (g1*c2)+(h1*f2)+(i1*i2),
  ];
};

const reduceMatrices = (m1Arr: Matrix[], m2Arr: Matrix[]) => {
  return reduce((matrices, m1) => {
    m2Arr.forEach(m2 => {
      matrices.push(combineMatrices(m1, m2));
    });
    return matrices;
  }, [] as Matrix[], m1Arr);
};

const rotatatePoint = (p: Point) => (m: Matrix): Point => {
  const [a, b, c, d, e, f, g, h, i] = m;
  const [x, y, z] = p;
  return [
    (a*x) + (b*y) + (c*z),
    (d*x) + (e*y) + (f*z),
    (g*x) + (h*y) + (i*z)
  ];
};

const translatePoint = (p: Point) => (t: Point): Point => {
  const [x,y,z] = p;
  const [a,b,c] = t;
  return [x+a,b+y,z+c];
};

const zMatrices: Matrix[] = [
  // 0
  [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ],
  // 90
  [
    0,-1, 0,
    1, 0, 0,
    0, 0, 1
  ],
  // 180
  [
   -1, 0, 0,
    0,-1, 0,
    0, 0, 1
  ],
  // 270
  [
    0, 1, 0,
   -1, 0, 0,
    0, 0, 1
  ]
];

// Only need the 90 and 270 degrees
const yMatrices: Matrix[] = [
  // 90
  [
    0, 0, 1,
    0, 1, 0,
   -1, 0, 0
  ],
  // 270
  [
    0, 0,-1,
    0, 1, 0,
    1, 0, 0
  ]
];

const xMatrices: Matrix[] = [
  // 0
  [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ],
  // 90
  [
    1, 0, 0,
    0, 0,-1,
    0, 1, 0
  ],
  // 180
  [
    1, 0, 0,
    0,-1, 0,
    0, 0,-1
  ],
  // 270
  [
    1, 0, 0,
    0, 0, 1,
    0,-1, 0
  ]
];

const xAndYMatrices = [...xMatrices, ...yMatrices]; 

// This should return the identity matrix first, as it's the first matrix in both
// xAndYMatrices and zMatrices
export const ALL_ROTATION_MATRICES = reduceMatrices(zMatrices, xAndYMatrices);

export const calculateRotations = (p: Point): Point[] => {
  return ALL_ROTATION_MATRICES.map(rotatatePoint(p));
};

// A unique key for a relative vector between 2 points. Using big numbers
// like this allows me to ensure no collisions happen. Still cheaper than
// using a hash (though strings might actually be faster at this point...)
export const vectorKey = ([x1,y1,z1]: Point, [x2,y2,z2]: Point): bigint => {
  return (100_000_000_000_000n * BigInt(x1-x2))
       + (10_000_000n * BigInt(y1-y2))
       + BigInt(z1-z2);
};

// Returns a translation vector which when applied to the second point will
// recreate the first point
export const vectorDifference = ([x1,y1,z1]: Point, [x2,y2,z2]: Point): Point => {
  return [(x1-x2), (y1-y2), (z1-z2)];
};

export const transform = (
  points: Point[],
  [firstTransform, secondTransform]: Transformation
): Point[] => {
  if (firstTransform.length === 9) {
    return points.map(point => (
      translatePoint(
        rotatatePoint(point)(firstTransform as Matrix)
      )(secondTransform as Point)
    ));
  } else if (firstTransform.length === 3) {
    return points.map(point => (
      rotatatePoint(
        translatePoint(point)(firstTransform as Point)
      )(secondTransform as Matrix)
    ));
  }
  throw new Error('Invalid transform type');
};

// The reverse of a translation
export const inverseVector = (point: Point): Point => {
  return vectorDifference([0,0,0], point);
};

// The reverse of a rotation
export const inverseMatrix = ([a,b,c,d,e,f,g,h,i]: Matrix): Matrix => {
  // Just reflect over diagonal
  return [a,d,g,b,e,h,c,f,i];
};
