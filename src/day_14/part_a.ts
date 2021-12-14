import { concat, dropLast, aperture, reduce, sort, last } from 'ramda';
import { Input, Rules } from './inputs';

// Like a join, but where you remove the shared end
const glue = (firstPart: string[], secondPart: string[]): string[] => {
  return concat(
    dropLast(1, firstPart),
    secondPart
  );
};

const insert = (first: string, second: string, rules: Rules, depth: number): string[] => {
  if (depth === 0) {
    return [first, second];
  }

  const pair = `${first}${second}`;
  const insertion = rules.get(pair);
  return (insertion === undefined)
    ? [first, second]
    : glue(
        insert(first, insertion, rules, depth - 1),
        insert(insertion, second, rules, depth - 1)
      );
};

export const quantityDifference = ({ template, rules }: Input, depth: number): number => {
  const initialPairs = aperture(2, template.split(''));// as [string, string][];
  
  const polymer = reduce((acc, [first, second]) => {
    return glue(
      acc,
      insert(first, second, rules, depth)
    );
  }, [] as string[], initialPairs);

  const heatMap = new Map<string, number>();
  for (const component of polymer) {
    heatMap.set(component, (heatMap.get(component) || 0) + 1);
  }

  const counts = sort((a, b) => a - b, Array.from(heatMap.values()));
  return last(counts)! - counts[0];
};
