import test from 'ava';
import {
  part_a_sample_1,
  part_a_sample_2,
  part_a_sample_3,
  part_a_sample_4,
  part_a_sample_5,
  part_a_sample_6,
  part_a_sample_7,
  part_b_sample_1,
  part_b_sample_2,
  part_b_sample_3,
  part_b_sample_4,
  part_b_sample_5,
  part_b_sample_6,
  part_b_sample_7,
  part_b_sample_8,
  input
} from './inputs';
import { getPacketVersionSum } from './part_a';
import { calculate } from './part_b';

test('Part A', t => {
  t.is(getPacketVersionSum(part_a_sample_1), 6, 'sample 1');
  t.is(getPacketVersionSum(part_a_sample_2), 9, 'sample 2');
  t.is(getPacketVersionSum(part_a_sample_3), 14, 'sample 3');
  t.is(getPacketVersionSum(part_a_sample_4), 16, 'sample 4');
  t.is(getPacketVersionSum(part_a_sample_5), 12, 'sample 5');
  t.is(getPacketVersionSum(part_a_sample_6), 23, 'sample 6');
  t.is(getPacketVersionSum(part_a_sample_7), 31, 'sample 7');
  t.is(getPacketVersionSum(input), 929, 'input');
});

test('Part B', t => {
  t.is(calculate(part_b_sample_1), 3n, 'sample 1');
  t.is(calculate(part_b_sample_2), 54n, 'sample 2');
  t.is(calculate(part_b_sample_3), 7n, 'sample 3');
  t.is(calculate(part_b_sample_4), 9n, 'sample 4');
  t.is(calculate(part_b_sample_5), 1n, 'sample 5');
  t.is(calculate(part_b_sample_6), 0n, 'sample 6');
  t.is(calculate(part_b_sample_7), 0n, 'sample 7');
  t.is(calculate(part_b_sample_8), 1n, 'sample 8');
  t.is(calculate(input), 911945136934n, 'input');
});
