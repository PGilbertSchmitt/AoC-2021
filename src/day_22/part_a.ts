import { clamp, range } from 'ramda';
import { Instruction } from './inputs';

const MIN = -50;
const MAX = 50;

const coorKey = (x: number, y: number, z: number) => {
  return (x * 1_000_000) + (y * 10_000) + z;
};

const intersectionExists = (a: number, b: number): boolean => {
  return a <= MAX && b >= MIN;
};

export const initializeCore = (instructions: Instruction[]): number => {
  const onSet = new Set<number>();
  const clamper = clamp(-50, 50);

  for (const instruction of instructions) {
    const [x1, x2] = instruction.volume.x;
    const [y1, y2] = instruction.volume.y;
    const [z1, z2] = instruction.volume.z;
    if (
      intersectionExists(x1, x2) &&
      intersectionExists(y1, y2) &&
      intersectionExists(z1, z2)
    ) {
      // WOWEE! That's a lot of nesting!
      for (const x of range(clamper(x1), clamper(x2)+1)) {
        for (const y of range(clamper(y1), clamper(y2)+1)) {
          for (const z of range(clamper(z1), clamper(z2)+1)) {
            const key = coorKey(x, y, z);
            instruction.on
              ? onSet.add(key)
              : onSet.delete(key);
          }
        }
      }
    }
  }

  return onSet.size;
};
