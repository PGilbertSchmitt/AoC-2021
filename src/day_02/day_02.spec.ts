import test from 'ava';
import { getDistanceProduct } from './part_a';
import { getAimProduct } from './part_b';
import { sample, input } from './inputs';

test('Part A', t => {
  t.is(getDistanceProduct(sample), 150, 'sample');
  t.is(getDistanceProduct(input), 2073315, 'input');
});

test('Part B', t => {
  t.is(getAimProduct(sample), 900, 'sample');
  t.is(getAimProduct(input), 1840311528, 'input');
});