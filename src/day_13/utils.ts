import { Point, Fold } from './inputs';

const foldValue = (val: number, position: number): number => {
  if (val < position) return val;
  return val - (2 * (val - position));
};

const foldPoint = ({x, y}: Point, {axis, position}: Fold): Point => {
  if (axis === 'x') {
    return {
      x: foldValue(x, position),
      y 
    }
  } else {
    return {
      x,
      y: foldValue(y, position)
    }
  }
};

export const foldAllPoints = (points: Point[], fold: Fold): Point[] => {
  return points.map(point => foldPoint(point, fold));
};
