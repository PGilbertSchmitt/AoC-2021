import test from 'ava';
import { sample, input } from './inputs';
import { errorScore } from './part_a';
import { autocompleteScore } from './part_b';

test('Part A', t => {
  t.is(errorScore(sample), 26397, 'sample');
  t.is(errorScore(input), 240123, 'input');
});

test('Part B', t => {
  t.is(autocompleteScore(sample), 288957, 'sample');
  t.is(autocompleteScore(input), 69, 'input');
});
