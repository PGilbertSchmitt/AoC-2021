import test from 'ava';
import { input, sample } from './inputs';
import { uniqueSegmentCounts } from './part_a';
import { sumOfSegmentDisplays } from './part_b';

test('Part A', t => {
  t.is(uniqueSegmentCounts(sample), 26, 'sample');
  t.is(uniqueSegmentCounts(input), 362, 'input');
});

test('Part B', t => {
  t.is(sumOfSegmentDisplays(sample), 61229, 'sample');
  t.is(sumOfSegmentDisplays(input), 1020159, 'sample');
});
