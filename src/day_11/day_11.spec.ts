import test from 'ava';
import { input, sample } from './inputs';
import { after100Steps } from './part_a';
import { firstSimultaneousFlash } from './part_b';

test('Part A', t => {
  t.is(after100Steps(sample), 1656, 'sample');
  t.is(after100Steps(input), 1697, 'input');
});

test('Part B', t => {
  t.is(firstSimultaneousFlash(sample), 195, 'sample');
  t.is(firstSimultaneousFlash(input), 344, 'input');
});
