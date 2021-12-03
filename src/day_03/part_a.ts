import { Input } from './inputs';

const buildMap = ({ length, values }: Input) => {
  const map: Record<number, number> = {};
  for (let i = 0; i < length; i++) {
    map[i] = 0;
  }
  for (const number of values) {
    for (let i = 0; i < length; i++) {
      if ((number & (1 << i)) !== 0) {
        map[i] += 1;
      }
    }
  }
  return map;
};

export const buildProduct = ({ length, values }: Input) => {
  const map = buildMap({ length, values });
  let gamma = 0;
  let epsilon = 0;
  const half = values.length / 2;
  for (let i = 0; i < length; i++) {
    const count = map[i];
    const bit = 1 << i;
    if (count === half) {
      throw new Error('Equal count of 1s and 0s, undefined behavior');
    }
    if (count > half) {
      gamma += bit;
    } else {
      epsilon += bit;
    }
  }

  return gamma * epsilon;
};
