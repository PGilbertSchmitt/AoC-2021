import { reduce, sort } from 'ramda';

const moveWhileEq = (from: number[], to: number[], value: number) => {
  while (from[from.length - 1] === value) {
    to.push(from.pop()!); // Won't hit the edges unless I've gone wrong somewhere
  }
};

export const getCheapestCost = (positions: number[]): number => {
  const sortedPositions = sort((a, b) => a - b, positions);
  let currentPosition = sortedPositions[sortedPositions.length - 1]; // start from end for popping
  let currentCost = reduce((acc, pos) => acc + (currentPosition - pos), 0, sortedPositions);
  const remainder: number[] = [];
  while (true) {
    moveWhileEq(sortedPositions, remainder, currentPosition--);
    const newCost = currentCost - sortedPositions.length + remainder.length;

    if (currentPosition < 0) {
      break;
    }

    if (newCost < currentCost) {
      currentCost = newCost;
    } else {
      break;
    }
  }

  return currentCost;
};
