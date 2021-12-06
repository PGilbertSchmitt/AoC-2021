import test from 'ava';
import { sample, input } from '../src/day_06/inputs';
import { simulateFish } from '../src/day_06/sharedSolution';

test('Part A', t => {
  t.is(simulateFish(sample, 18), 26, 'pre-sample');
  t.is(simulateFish(sample, 80), 5934, 'sample');
  t.is(simulateFish(input, 80), 349549, 'input');
});

test('Part B', t => {
  t.is(simulateFish(sample, 256), 26984457539, 'sample');
  t.is(simulateFish(input, 256), 1589590444365, 'input');
});
