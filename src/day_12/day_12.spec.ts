import test from 'ava';
import { input, sampleA, sampleB, sampleC } from './inputs';
import { getPathCount } from './shared_solution';

test('Part A', t => {
  t.is(getPathCount(sampleA, false), 10, 'first sample');
  t.is(getPathCount(sampleB, false), 19, 'second sample');
  t.is(getPathCount(sampleC, false), 226, 'third sample');
  t.is(getPathCount(input, false), 4970, 'input');
});

test('Part B', t => {
  t.is(getPathCount(sampleA, true), 36, 'first sample');
  t.is(getPathCount(sampleB, true), 103, 'second sample');
  t.is(getPathCount(sampleC, true), 3509, 'third sample');
  t.is(getPathCount(input, true), 137948, 'input');
});
