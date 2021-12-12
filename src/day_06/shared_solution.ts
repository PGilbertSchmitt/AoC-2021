import { reduce, sum, times } from "ramda";

const passDay = (ageCounts: number[]) => {
  const [birthing, ...rest] = ageCounts;
  rest[6] += birthing;
  rest[8] = birthing;
  return rest;
};

export const simulateFish = (fish: number[], days: number): number => {
  let ageCounts = reduce((counts, age) => {
    counts[age] += 1;
    return counts;
  }, [0,0,0,0,0,0,0,0,0], fish)

  times(() => {
    ageCounts = passDay(ageCounts);
  }, days);

  return sum(ageCounts);
};
