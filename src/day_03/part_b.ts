import { partition } from 'ramda';
import { Input } from './inputs';

const OXYGEN = 1;
const CO2 = 0;

const largerOf = (listA: number[], listB: number[]): number[] | null => {
  if (listA.length === listB.length) return null;
  if (listA.length > listB.length) return listA;
  return listB;
}

const smallerOf = (listA: number[], listB: number[]): number[] | null => {
  if (listA.length === listB.length) return null;
  if (listA.length > listB.length) return listB;
  return listA;
}

const filterValue = (values: number[], bit: number, criteria: 1 | 0): number => {
  if (values.length === 1) { return values[0]; }
  const [zeroList, oneList] = partition<number>(value => (value & bit) === 0, values);
  if (criteria === OXYGEN) {
    const largerList = largerOf(zeroList, oneList);
    const oxygenList = largerList || oneList;
    return filterValue(oxygenList, bit >> 1, criteria);
  } else {
    const smallerList = smallerOf(zeroList, oneList);
    const co2List = smallerList || zeroList;
    return filterValue(co2List, bit >> 1, criteria);
  }
};

export const getRatings = ({ values, length }: Input): number => {
  const startingBit = 1 << (length - 1);
  const oxygenGeneratorRating = filterValue(values, startingBit, OXYGEN);
  const co2ScrubberRating = filterValue(values, startingBit, CO2);
  return oxygenGeneratorRating * co2ScrubberRating;
};
