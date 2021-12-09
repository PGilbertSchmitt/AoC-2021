import { all, isNil, sum } from 'ramda';
import { Grid } from './inputs';

export const neighborValues = (grid: Grid, x: number, y: number) => {
  return [
    grid[x+1] && grid[x+1][y],
    grid[x-1] && grid[x-1][y],
    grid[x][y-1],
    grid[x][y+1],
  ];
};

export const lowPoints = (grid: Grid) => {
  const points: number[] = [];
  grid.forEach((row, x) => {
    row.forEach((point, y) => {
      if (all(neighbor => isNil(neighbor) || neighbor > point, neighborValues(grid, x, y))) {
        points.push(point);
      }
    })
  });
  return sum(points) + points.length;
};