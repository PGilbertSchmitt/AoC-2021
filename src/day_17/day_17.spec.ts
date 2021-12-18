import test from 'ava';
import { sample, input } from './input';
import { highestArc } from './part_a';
import { validTrajectoryCount } from './part_b';

test('Part A', t => {
  t.is(highestArc(sample), 45, 'sample');
  t.is(highestArc(input), 6903, 'input');
});

test('Part B', t => {
  t.is(validTrajectoryCount(sample), 112, 'sample');
  t.is(validTrajectoryCount(input), 2351, 'sample');
});
