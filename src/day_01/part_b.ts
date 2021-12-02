import { sum } from 'ramda';
import { increases } from './part_a';

const generateSums = (list: number[]): number[] => {
  const windows: number[] = [];
  const [first, second, third, ...rest] = list;
  const window = [first, second, third];
  windows.push(sum(window));
  for (const el of rest) {
    window.shift();
    window.push(el);
    windows.push(sum(window));
  }
  return windows;
};

export const windowIncreases = (list: number[]): number => {
  const sums = generateSums(list);
  return increases(sums);
};
