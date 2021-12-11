import { clone } from 'ramda';
import { step } from './util';

export const after100Steps = (inputGrid: number[][]) => {
  const grid = clone(inputGrid);
  let sum = 0;
  for (let i = 0; i < 100; i++) {
    const flashes = step(grid);
    sum += flashes;
  }
  return sum;
};
