import test from 'ava';
import { input, sample } from '../src/day_05/inputs';
import { findVentCollisions } from '../src/day_05/part_a';
import { findVentCollisions as findAllVentCollisions } from '../src/day_05/part_b';

test('Part A', t => {
  t.is(findVentCollisions(sample), 5, 'sample');
  t.is(findVentCollisions(input), 4655, 'input');
});

test('Part B', t => {
  t.is(findAllVentCollisions(sample), 12, 'sample');
  t.is(findAllVentCollisions(input), 20500, 'input');
})