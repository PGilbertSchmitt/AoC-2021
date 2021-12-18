import { Input } from './input';
import { highestArc } from './part_a';

const findLowerXBound = (xMin: number): number => {
  let sum = 1;
  let add = 1;
  while (sum < xMin) {
    add++;
    sum += add;
  }
  return add;
};

// I'm sure there's a better way to do this, but it still doesn't take that long to calculate
export const validTrajectoryCount = (input: Input): number => {
  const { xMin, xMax, yMin, yMax } = input;
  
  const upperX = xMax;
  const lowerX = findLowerXBound(xMin);
  const upperY = highestArc(input);
  const lowerY = yMin;

  const inTrench = (x: number, y: number): boolean => {
    return xMax >= x && x >= xMin && yMax >= y && y >= yMin;
  }

  const hitsTrench = (
    xStartVelocity: number,
    yStartVelocity: number
  ): boolean => {
    let dX = xStartVelocity;
    let dY = yStartVelocity;
    let x = dX;
    let y = dY;
    while (x <= xMax && y >= yMin) {
      if (inTrench(x, y)) {
        return true;
      }
      if (dX > 0) { dX-- };
      dY--;
      x += dX;
      y += dY;
    }
    return false;
  };

  let validTrajectory = 0;

  for (let x = lowerX; x <= upperX; x++) {
    for (let y = lowerY; y <= upperY; y++) {
      if (hitsTrench(x, y)) {
        validTrajectory++;
      }
    }
  }

  return validTrajectory;
};
