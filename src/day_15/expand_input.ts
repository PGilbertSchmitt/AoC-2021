import { times } from "ramda";
import { Grid } from "./inputs";

// const values = () => {

// };

// const bump = (amount: number, array: number[]) => array.map(x => (x + amount) % 10);

const setToGrid = (x: number, y: number, inputGrid: Grid, outputGrid: Grid) => {
  const value = inputGrid[x][y];
  times(xIter => {
    const newX = inputGrid.length * xIter + x;
    times(yIter => {
      const newY = inputGrid[0].length * yIter + y;
      // Wraps around 1 -> 9
      outputGrid[newX][newY] = (((value - 1) + xIter + yIter) % 9) + 1;
    }, 5);
  }, 5);
};

export const expandInput = (input: Grid): Grid => {
  const biggerGrid: Grid = Array.from(new Array(input.length * 5)).map(() => Array.from(new Array(input[0].length * 5)));

  // Even though there are 4 loops nested here, it's still O(n)
  times(x => {
    times(y => {
      setToGrid(x, y, input, biggerGrid);
    }, input[0].length);
  }, input.length);

  return biggerGrid;
};
