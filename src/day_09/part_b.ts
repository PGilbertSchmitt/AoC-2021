import { product, sort, sum, takeLast } from 'ramda';
import { Grid } from './inputs';

type LocationMap = Map<number, Set<number>>;

const createLocationMap = (grid: Grid): LocationMap => {
  const locationMap: LocationMap = new Map();
  grid.forEach((row, x) => {
    const rowSet = new Set<number>();
    row.forEach((value, y) => {
      if (value !== 9) rowSet.add(y);
    });
    locationMap.set(x, rowSet);
  });
  return locationMap;
};

const exploreLocation = (map: LocationMap, x: number, y: number) => {
  const rowSet = map.get(x);
  if (rowSet === undefined) { return false; }
  const hadValue = rowSet.delete(y);
  if (rowSet.size === 0) {
    map.delete(x);
  };
  return hadValue;
};

const neighborCoordinates = (x: number, y: number) => [
  [x + 1, y],
  [x - 1, y],
  [x, y + 1],
  [x, y - 1]
];

const exploreBasin = (unexplored: LocationMap, x: number, y: number): number => {
  if (exploreLocation(unexplored, x, y)) {
    return 1 + sum(neighborCoordinates(x, y).map(([x2, y2]) => exploreBasin(unexplored, x2, y2)));
  } else {
    return 0;
  }
}

export const largestBasinSizes = (grid: Grid) => {
  // Map of sets of all positions we haven't checked yet that aren't 9
  const unexplored = createLocationMap(grid);
  
  const basins: number[] = [];
  while (unexplored.size > 0) {
    const [ x, rowSet ] = Array.from(unexplored.entries())[0];
    const y = Array.from(rowSet.keys())[0];
    basins.push(exploreBasin(unexplored, x, y));
  }

  return product(takeLast(3, sort((a, b) => a - b, basins)));
};
