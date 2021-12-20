import test from 'ava';
import { sample, input } from './inputs';
import { beaconCount } from './part_a';
import { furthestManDistance } from './part_b';

test('Part A', t => {
  t.is(beaconCount(sample), 79, 'sample');
  t.is(beaconCount(input), 303, 'input');
});

test('Part B', t => {
  t.is(furthestManDistance(sample), 3621, 'sample');
  t.is(furthestManDistance(input), 9621, 'input');
});
