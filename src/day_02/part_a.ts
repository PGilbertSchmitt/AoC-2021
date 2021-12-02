export interface Instruction {
  dir: string;
  dist: number;
}

export const parse = (input: string[]): Instruction[] => {
  return input.map(line => {
    const [dir, distStr] = line.split(" ");
    return { dir, dist: parseInt(distStr) };
  });
};

export const getDistanceProduct = (input: string[]): number => {
  let horizontal = 0;
  let depth = 0;
  for (const { dir, dist } of parse(input)) {
    switch (dir) {
      case "forward":
        horizontal += dist;
        break;
      case "up":
        depth -= dist;
        break;
      case "down":
        depth += dist;
        break;
    }
  }
  return horizontal * depth;
};
