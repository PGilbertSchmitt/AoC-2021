import test from 'ava';
import { increases } from './part_a';
import { windowIncreases } from './part_b';
import {
  sample,
  input
} from './inputs';

test('Part A', t => {
  t.is(increases(sample), 7, 'sample');
  t.is(increases(input), 1301, 'input');
});

test('Part B', t => {
  t.is(windowIncreases(sample), 5, 'sample');
  t.is(windowIncreases(input), 1346, 'input');
});
