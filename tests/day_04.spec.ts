import test from 'ava';
import { sample, input } from '../src/day_04/inputs';
import { winBingo } from '../src/day_04/part_a';
import { loseBingo } from '../src/day_04/part_b';

test('Part A', t => {
  t.is(winBingo(sample), 4512, 'sample');
  t.is(winBingo(input), 32844, 'input');
});

test('Part B', t => {
  t.is(loseBingo(sample), 1924, 'sample');
  t.is(loseBingo(input), 4920, 'input');
});