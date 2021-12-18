import { drop } from "ramda";

export interface Input {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}

const transform = (input: string): Input => {
  const [x, y] = drop(13, input).split(', ');
  const [x1, x2] = drop(2, x).split('..').map(val => parseInt(val));
  const [xMax, xMin] = x1 > x2 ? [x1, x2] : [x2, x1];
  const [y1, y2] = drop(2, y).split('..').map(val => parseInt(val));
  const [yMax, yMin] =  y1 > y2 ? [y1, y2] : [y2, y1];
  return {
    xMax,
    xMin,
    yMax,
    yMin
  };
};

export const sample = transform(`target area: x=20..30, y=-10..-5`);
export const input = transform(`target area: x=235..259, y=-118..-62`);
