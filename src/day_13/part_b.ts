import { reduce } from 'ramda';
import { Input, Point } from './inputs';
import { foldAllPoints } from './utils';

const pointToKey = ({x, y}: Point): number => {
  return x + (y * 10000);
};

const keyToPoint = (value: number): Point => {
  const x = value % 10000;
  const y = (value - x) / 10000;
  return { x, y };
};

export const processAllFolds = (input: Input) => {
  const foldedPoints = reduce(
    (points, fold) => foldAllPoints(points, fold),
    input.points,
    input.folds
  );
  const pointSet = new Set<number>();
  foldedPoints.forEach(point => pointSet.add(pointToKey(point)));

  let highX = 0;
  let highY = 0;
  const finalPoints = Array.from(pointSet.keys()).map(key => {
    const point = keyToPoint(key);
    if (point.x > highX) { highX = point.x; }
    if (point.y > highY) { highY = point.y; }
    return point;
  });

  // To make reading easier, I swap X and Y
  const sheetRow: string[] = Array.from(new Array(highX + 1)).map(() => '.');
  const sheet: string[][] = Array.from(new Array(highY + 1)).map(() => [...sheetRow]);

  for (const {x, y} of finalPoints) {
    sheet[y][x] = '#';
  }

  return sheet.map(row => row.join('')).join('\n');
};
