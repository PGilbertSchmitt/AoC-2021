import test from 'ava';
import { sample, input } from './inputs';
import { quantityDifference } from './part_a';
import { cachedQuantityDifference } from './part_b';

test('Part A', t => {
  t.is(quantityDifference(sample, 10), 1588, 'sample');
  t.is(cachedQuantityDifference(sample, 10), 1588, 'sample with part B\'s solution');
  t.is(quantityDifference(input, 10), 3306, 'input');
  t.is(cachedQuantityDifference(input, 10), 3306, 'input with part B\'s solution');
});

test('Part B', t => {
  t.is(cachedQuantityDifference(sample, 40), 2188189693529, 'sample');
  t.is(cachedQuantityDifference(input, 40), 3760312702877, 'input');
});
