import { Input } from './inputs';
import { foldAllPoints } from './utils';

export const pointsAfterFirstFold = ({points, folds}: Input): number => {
  const pointSet = new Set<number>();
  foldAllPoints(points, folds[0]).forEach(({ x, y }) => {
    pointSet.add(x + (10000 * y)); // Better than string building
  });
  return pointSet.size;
};
