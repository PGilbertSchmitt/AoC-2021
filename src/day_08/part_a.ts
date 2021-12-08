import { reduce, sum } from "ramda";

// Digit "1" has 2 segments
// Digit "4" has 4 segments
// Digit "7" has 3 segments
// Digit "8" has 7 segments
// "2", "3", and "5" all have 5 segments
// "6", "9", and "0" all have 6 segments
export const uniqueSegmentCounts = (entries: string[]): number => {
  return sum(entries.map(entry => {
    const [_allPatterns, displayPatterns] = entry.split(' | ');
    return reduce((acc, digit) => {
      const segments = digit.length;
      if (segments === 2 || segments === 4 || segments === 3 || segments === 7) {
        return acc + 1
      }
      return acc;
    }, 0, displayPatterns.split(' '));
  }));
};
