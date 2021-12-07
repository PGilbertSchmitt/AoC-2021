import test from 'ava';
import { input, sample } from '../src/day_07/inputs';
import { getCheapestCost as getCheapestCostSimple } from '../src/day_07/part_a';
import { getCheapestCost } from '../src/day_07/part_b';

test('Part A', t => {
  t.is(getCheapestCostSimple(sample), 37, 'sample');
  t.is(getCheapestCostSimple(input), 349769, 'input');
});

test('Part B', t => {
  t.is(getCheapestCost(sample), 168, 'sample');
  t.is(getCheapestCost(input), 99540554, 'input');
});
