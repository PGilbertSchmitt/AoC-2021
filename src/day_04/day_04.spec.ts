import test from 'ava';
import { sample, input } from './inputs';
import { winBingo } from './part_a';
import { loseBingo } from './part_b';

test('Part A', t => {
  t.is(winBingo(sample), 4512, 'sample');
  t.is(winBingo(input), 32844, 'input');
});

test('Part B', t => {
  t.is(loseBingo(sample), 1924, 'sample');
  t.is(loseBingo(input), 4920, 'input');
});