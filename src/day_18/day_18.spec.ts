import test from 'ava';
import { sample, input } from './input';
import { totalMagnitude } from './part_a';
import { highestMagnitudeSum } from './part_b';

test('Part A', t => {
  t.is(totalMagnitude(sample), 4140, 'sample');
  t.is(totalMagnitude(input), 4417, 'input');
});

test('Part B', t => {
  t.is(highestMagnitudeSum(sample), 3993, 'sample');
  t.is(highestMagnitudeSum(input), 4796, 'input');
});
