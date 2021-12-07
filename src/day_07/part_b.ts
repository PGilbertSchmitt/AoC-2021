import { reduce, sum } from 'ramda';

const fuelCost = (diff: number) => (Math.pow(diff + 1, 2) - (diff + 1)) / 2;

const totalFuelCost = (positions: number[], split: number): number => {
  return reduce((acc, pos) => acc + fuelCost(Math.abs(split - pos)), 0, positions);
};

// This is going to be O(n^2). I can't figure a way to reduce the Big O any more,
// though I am optimizing somewhat by choosing a decent enough start point
export const getCheapestCost = (positions: number[]): number => {
  // const sortedPositions = sort((a, b) => a - b, positions);

  // As good a starting position as any
  const averagePosition = Math.floor(sum(positions) / positions.length);
  let cheapestCost = totalFuelCost(positions, averagePosition);
  
  let currentPosition = averagePosition;
  // Going right first
  while (true) {
    currentPosition++;
    const newCost = totalFuelCost(positions, currentPosition);
    if (newCost < cheapestCost) {
      cheapestCost = newCost;
    } else {
      break;
    }
  }

  // Now to the left, so reset to center
  currentPosition = averagePosition;
  while (true) {
    currentPosition--;
    const newCost = totalFuelCost(positions, currentPosition);
    if (newCost < cheapestCost) {
      cheapestCost = newCost;
    } else {
      break;
    }
  }

  return cheapestCost;
};
