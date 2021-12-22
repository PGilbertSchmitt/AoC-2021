import test from 'ava';
import { sample1, sample2, input } from './inputs';
import { initializeCore } from './part_a';
import { calculateCoreVolume } from './part_b';

test('Part A', t => {
  t.is(initializeCore(sample1), 590784, 'sample');
  t.is(initializeCore(input), 652209, 'input');
});

test('Part B', t => {
  t.is(calculateCoreVolume(sample2), 2758514936282235n, 'sample');
  t.is(calculateCoreVolume(input), 1217808640648260n, 'input');
});
