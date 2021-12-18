import { Input } from './input';

// I believe this is my first O(1) solution to any AoC problem
export const highestArc = ({ yMin }: Input): number => {
  const diff = yMin * -1;
  return ((diff ** 2) - diff) / 2;
}