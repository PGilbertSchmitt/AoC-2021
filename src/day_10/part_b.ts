import { reject, isNil, sort } from 'ramda';
import { parseString, closeOf } from './utils';

const autocomplete = (line: string): string[] | null => {
  const stack = parseString(line);
  return Array.isArray(stack)
    ? stack.map(closeOf)
    : null;
};

const calculateScore = (remaining: string[]): number => {
  let score = 0;
  while (remaining.length > 0) {
    score = (score * 5);
    switch (remaining.pop()) {
      case ')':
        score += 1;
        break;
      case ']':
        score += 2;
        break;
      case '}':
        score += 3;
        break;
      case '>':
        score += 4;
        break;
    }
  }
  return score;  
};

export const autocompleteScore = (lines: string[]): number => {
  const autocompletes = reject(isNil, lines.map(autocomplete));
  const scores = sort((a, b) => a - b, autocompletes.map(calculateScore));
  return scores[(scores.length - 1) / 2];
};
