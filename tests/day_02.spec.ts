import test from 'ava';
import { getDistanceProduct } from '../src/day_02/part_a';
import { getAimProduct } from '../src/day_02/part_b';
import { sample, input } from '../src/day_02/inputs';

test('Day 2', t => {
  t.is(getDistanceProduct(sample), 150, 'Part A sample');
  t.is(getDistanceProduct(input), 2073315, 'Part A');

  t.is(getAimProduct(sample), 900, 'Part B sample');
  t.is(getAimProduct(input), 1840311528, 'Part B');
});