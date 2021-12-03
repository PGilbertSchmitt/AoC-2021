import test from 'ava';
import { sample, input } from '../src/day_03/inputs';
import { buildProduct } from '../src/day_03/part_a';
import { getRatings } from '../src/day_03/part_b';

test('Part A', t => {
  t.is(buildProduct(sample), 198, 'sample');
  t.is(buildProduct(input), 3549854, 'input');
});

test('Part B', t => {
  t.is(getRatings(sample), 230, 'sample');
  t.is(getRatings(input), 3765399, 'input');
});
