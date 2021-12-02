import test from 'ava';
import { increases } from '../src/day_01/part_a';
import { windowIncreases } from '../src/day_01/part_b';
import {
  sample,
  input
} from '../src/day_01/inputs';

test('Day 1', t => {
  t.is(increases(sample), 7, 'Part A sample');
  t.is(increases(input), 1301, 'Part A');

  t.is(windowIncreases(sample), 5, 'Part B sample');
  t.is(windowIncreases(input), 1346, 'Part B');
});
