import test from 'ava';
import { sample, input } from './inputs';
import { litPixelCount } from './shared_solution';

test('Part A', t => {
  t.is(litPixelCount(sample, 2), 35, 'sample');
  t.is(litPixelCount(input, 2), 5249, 'input');
});

test('Part B', t => {
  t.is(litPixelCount(sample, 50), 3351, 'sample');
  t.is(litPixelCount(input, 50), 3351, 'input');
});
