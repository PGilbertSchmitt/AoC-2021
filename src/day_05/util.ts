import { zip } from 'ramda';
import { Point } from './inputs';

const range = (start: number, end: number): number[] => {
  const output = [];
  if (start < end) {
    for (let i = start; i < end+1; i++) {
      output.push(i);
    }
  } else {
    for (let i = start; i > end-1; i--) {
      output.push(i);
    }
  }
  return output;
};

export const verticalLine = (start: Point, end: Point): Array<[number, number]> => {
  return range(start.y, end.y).map(y => [start.x, y]);
};

export const horizontalLine = (start: Point, end: Point): Array<[number, number]> => {
  return range(start.x, end.x).map(x => [x, start.y]);
};

export const diagonalLine = (start: Point, end: Point): Array<[number, number]> => {
  const rangeX = range(start.x, end.x);
  const rangeY = range(start.y, end.y);
  return zip(rangeX, rangeY);
};
