export const increases = ([first, ...rest]: number[]): number => {
  let count = 0;
  let last = first;
  for (const el of rest) {
    el > last && count++;
    last = el;
  }
  return count;
};
