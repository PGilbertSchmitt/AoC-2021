import { parse } from './part_a';

export const getAimProduct = (input: string[]): number => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  for (const { dir, dist } of parse(input)) {
    switch (dir) {
      case "forward":
        horizontal += dist;
        depth += aim * dist;
        break;
      case "up":
        aim -= dist;
        break;
      case "down":
        aim += dist;
        break;
    }
  }
  return horizontal * depth;
};
