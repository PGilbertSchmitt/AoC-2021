import {  } from 'ramda';
import { Input } from './input';
import { Branch, parse, reduceTree } from './mathTree';
import { magnitude } from './part_a';

const allSums = (lines: Input[]): Branch[] => {
  const pairs: Branch[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      const branch = parse([lines[i], lines[j]], null);
      reduceTree(branch);
      pairs.push(branch);
    }
  }
  return pairs;
};

export const highestMagnitudeSum = (lines: Input[]): number => {
  let highMagnitude = 0;
  allSums(lines).forEach(branch => {
    const currentMagnitude = magnitude(branch);
    if (currentMagnitude > highMagnitude) {
      highMagnitude = currentMagnitude;
    }
  });
  return highMagnitude;
};
