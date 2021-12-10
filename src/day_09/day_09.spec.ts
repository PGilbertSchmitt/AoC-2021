import test from 'ava';
import { input, sample } from './inputs';
import { lowPoints } from './part_a';
import { largestBasinSizes } from './part_b';

test('Part A', t => {
  t.is(lowPoints(sample), 15, 'sample');
  t.is(lowPoints(input), 532, 'input');
});

test('Part B', t => {
  t.is(largestBasinSizes(sample), 1134, 'sample');
  t.is(largestBasinSizes(input), 1110780, 'input');
});
