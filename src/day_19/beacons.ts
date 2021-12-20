import { aperture, clone } from 'ramda';
import {
  Scanner,
  Point
} from './inputs';
import {
  Matrix,
  Transformation,
  calculateRotations,
  vectorKey,
  vectorDifference,
  inverseVector,
  inverseMatrix,
  transform,
  ALL_ROTATION_MATRICES
} from './matrix';

type RotationSet = Point[][];
type TransformationMap = Map<string, Transformation>;

// Returns a translation vector if the p1Arr and p2Arr have any points with at least
// 12 matching vectors
const enoughMatchingPoints = (p1Arr: Point[], p2Arr: Point[]): Point | null => {
  const vectorKeyCount = new Map<bigint, number>();
  for (const p1 of p1Arr) {
    for (const p2 of p2Arr) {
      const vector = vectorKey(p1, p2);
      const currentCount = (vectorKeyCount.get(vector) || 0) + 1;
      if (currentCount >= 12) {
        return vectorDifference(p1, p2);
      }
      vectorKeyCount.set(vector, currentCount);
    }
  }
  return null;
}

const hasMatch = (a: RotationSet, b: RotationSet): [Matrix, Point] | null => {
  const basePoints = a[0]; // The identity-matrix rotation for scanner A
  for (let i = 0; i < b.length; i++) {
    const rotatedPoints = b[i];
    const translationVector = enoughMatchingPoints(basePoints, rotatedPoints);
    if (translationVector !== null) {
      // Get the matrix that did this. I know I'm relying on shared indexes between
      // 2 arrays, but I'm going crazy here
      return [ALL_ROTATION_MATRICES[i], translationVector];
    }
  };
  return null;
};

const initializePointArrays = (rows: number, cols: number): Point[][] => {
  const newArray = new Array(rows);
  for (let row = 0; row < rows; row++) {
    newArray[row] = new Array(cols)
  }
  return newArray;
};

// Builds an array where the scanner's ID is the index to an array containing its neighbors
const pathGraph = (pairs: string[]): number[][] => {
  const pathComponents: number[][] = [];

  let skip = false;
  for (const pair of pairs) {
    // Every odd-index pair is the reverse of the pair before it
    if (!skip) {  
      const [a, b] = pair.split(',').map(x => parseInt(x));
      const currentA = pathComponents[a] || [];
      pathComponents[a] = [...currentA, b];
      const currentB = pathComponents[b] || [];
      pathComponents[b] = [...currentB, a];

    }
    skip = !skip;
  }

  return pathComponents;
};

const buildPaths = (currentPaths: number[][], graph: number[][]): number[][] => {
  const newPaths: number[][] = [...currentPaths];

  for (const path of currentPaths) {
    const lastNode = path[0];
    const nextNodes = graph[lastNode];
    for (const nextNode of nextNodes) {
      if (!path.includes(nextNode)) {
        // Build the paths in reverse
        const newPath = [nextNode, ...path];
        newPaths.push(...buildPaths([newPath], graph));
      }
    }

  }

  return newPaths;
};

const buildScannerMap = (scanners: Scanner[]) => {
  const scannerMap: Point[][][] = new Array(scanners.length);
  scanners.forEach((scanner, scannerIndex) => {
    const rotationsByPoint: Point[][] = scanner.map(point => calculateRotations(point));
    const pointsByRotation: Point[][] = initializePointArrays(
      rotationsByPoint[0].length,
      rotationsByPoint.length
    );
    // Swap
    for (let i = 0; i < rotationsByPoint.length; i++) {
      for (let j = 0; j < rotationsByPoint[0].length; j++) {
        pointsByRotation[j][i] = rotationsByPoint[i][j];
      }
    }
    scannerMap[scannerIndex] = pointsByRotation;
  });
  return scannerMap;
};

const buildTransformationMap = (scannerMap: Point[][][]): TransformationMap => {
  const transformationMap: TransformationMap = new Map();

  for (let i = 0; i < scannerMap.length; i++) {
    const baseScanner = scannerMap[i];
    for (let j = i+1; j < scannerMap.length; j++) {
      const otherScanner = scannerMap[j];
      const transformations = hasMatch(baseScanner, otherScanner);
      if (transformations !== null) {
        // These are the transforms for other => base
        const [rotationMatrix, translationVector] = transformations;
        const reverseRotation = inverseMatrix(rotationMatrix);
        const reverseTranslation = inverseVector(translationVector);

        // Set baseScanner relative to otherScanner
        transformationMap.set(`${j},${i}`, [rotationMatrix, translationVector]);

        // Set otherScanner relative to baseScanner using reverse operations in
        // reverse order (translate THEN rotate)
        transformationMap.set(`${i},${j}`, [reverseTranslation, reverseRotation]);
      }
    }
  }

  return transformationMap;
};

// Duplicate paths exist where the start and end are the same, but
// the route is different. I just need the shortest path for every
// start
const cullPaths = (paths: number[][]): number[][] => {
  const outPaths: number[][] = [];
  for (const path of paths) {
    const index = path[0];
    const currentPath = outPaths[index];
    if (currentPath === undefined || currentPath.length > path.length) {
      outPaths[index] = path;
    }
  }
  return outPaths;
};

// Returns an array of transformed points.
// The last point is the location of the scanner itself
const transformedPoints = (
  path: number[],
  startingPoints: Point[],
  transformMap: TransformationMap
): Point[] => {
  if (path.length === 1) {
    return clone(startingPoints);
  }
  let points = clone(startingPoints);
  for (const [fromIndex, toIndex] of aperture(2, path)) {
    const transformation = transformMap.get(`${fromIndex},${toIndex}`)!;
    points = transform(points, transformation);
  }
  return points;
};

export const uniqueBeacons = (scanners: Scanner[]): [Point[], Point[]] => {
  const scannerMap = buildScannerMap(scanners);
  const transformationMap = buildTransformationMap(scannerMap);

  const pathPairs = pathGraph(Array.from(transformationMap.keys()));
  const paths = cullPaths(buildPaths([[0]], pathPairs));

  const vectorSet = new Set<bigint>();
  const beaconPoints: Point[] = [];
  const scannerPoints: Point[] = [];

  for (const path of paths) {
    const scannerIndex = path[0];
    const startingPoints = scannerMap[scannerIndex][0];

    // An origin point is added to the start of the starting points
    // This is the location of the scanner
    const [scannerPoint, ...possibleBeaconPoints] =
      transformedPoints(path, [[0,0,0], ...startingPoints], transformationMap);

    scannerPoints.push(scannerPoint);
    for (const point of possibleBeaconPoints) {
      const key = vectorKey(point, [0,0,0]);
      if (!vectorSet.has(key)) {
        beaconPoints.push(point);
        vectorSet.add(key);
      }
    }
  }

  return [beaconPoints, scannerPoints];
};
