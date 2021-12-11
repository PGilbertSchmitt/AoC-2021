import { all, clone, equals } from 'ramda';
import { step } from './util';

export const firstSimultaneousFlash = (inputGrid: number[][]) => {
  const grid = clone(inputGrid);
  let stepNum = 0;
  while (true) {
    step(grid);
    stepNum++;
    if (all(all(equals(0)), grid)) {
      return stepNum;
    }
  }
};
