type Coor = [number, number];

const neighbors = ([x, y]: Coor): Coor[] => [
  [x-1, y-1],
  [x-1, y],
  [x-1, y+1],
  [x, y-1],
  [x, y+1],
  [x+1, y-1],
  [x+1, y],
  [x+1, y+1]
];

// Increment all neighbors and return the newly flashing coordinates for processing
const incrementNeighbors = (grid: number[][], coor: Coor): Coor[] => {
  const flashed: Coor[] = [];
  neighbors(coor).forEach(([x, y]) => {
    const row = grid[x];
    const value = row && row[y];
    if (value !== undefined) {
      const newValue = grid[x][y] + 1;
      // Any less than 9 and it isn't flashing yet
      // Any greater than 9 and it already flashed this step, so don't reprocess
      if (newValue === 9) {
        flashed.push([x, y]);
      }
      grid[x][y] = newValue;
    }
  });
  return flashed;
};

// This mutates the grid and returns the number of flashes
export const step = (grid: number[][]): number => {
  let flashCount = 0;
  const flashQueue: Coor[] = [];

  // First, process all 9s, which are the first to flash
  grid.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value === 9) {
        flashQueue.push([x, y])
        flashCount++;
      }
    });
  });

  // Now that we have our starting point, we process the queue, adding new dumbo
  // optopodes to the queue if they also flash
  while (flashQueue.length > 0) {
    const coor = flashQueue.shift()!; // Improve from O(n^2) or you're FIRED
    incrementNeighbors(grid, coor).forEach(flashedCoor => {
      flashQueue.push(flashedCoor);
      flashCount++;
    });
  }

  // Lastly, reset or increment
  grid.forEach((row, x) => {
    row.forEach((value, y) => {
      grid[x][y] = value > 8 ? 0 : value+1;
    });
  });


  return flashCount;
};
