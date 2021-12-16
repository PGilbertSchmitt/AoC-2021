import test from 'ava';
import { sample, input } from './inputs';
import { cheapestPath } from './part_a';
import { expandInput } from './expand_input';
import { findShortestPathCost } from './part_b';

test('Part A', t => {
  t.is(cheapestPath(sample), 40, 'sample');
  t.is(cheapestPath(input), 748, 'input');
  t.is(findShortestPathCost(sample), 40, 'sample with part 2\'s solution');
  t.is(findShortestPathCost(input), 748, 'input with part 2\'s solution');
});

test('Part B', t => {
  const newSample = expandInput(sample);
  t.is(findShortestPathCost(newSample), 315, 'sample');

  const newInput = expandInput(input);
  t.is(findShortestPathCost(newInput), 3045, 'input');
});
