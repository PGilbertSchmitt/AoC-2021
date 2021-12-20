import { Scanner, Point } from './inputs';
import { uniqueBeacons } from './beacons';

const manDistance = ([x1,y1,z1]: Point, [x2,y2,z2]: Point): number => {
  return Math.abs(x1-x2) + Math.abs(y1-y2) + Math.abs(z1-z2);
};

export const furthestManDistance = (scanners: Scanner[]): number => {
  const [_beacons, scannerPoints] = uniqueBeacons(scanners);

  let highestManDistance = 0;
  for (let i = 0; i < scannerPoints.length; i++) {
    for (let j = i+1; j < scannerPoints.length; j++) {
      const dist = manDistance(scannerPoints[i], scannerPoints[j]);
      if (dist > highestManDistance) {
        highestManDistance = dist;
      }
    }
  }

  return highestManDistance;
};
