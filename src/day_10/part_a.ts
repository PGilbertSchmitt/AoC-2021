import { reduce } from "ramda";
import { parseString } from './utils';

export const errorScore = (lines: string[]): number => {
  return reduce((sum, line) => {
    switch (parseString(line)) {
      case ')': return sum + 3;
      case ']': return sum + 57;
      case '}': return sum + 1197;
      case '>': return sum + 25137;
      default:
        return sum;
    }
  }, 0, lines);
};
