import test from 'ava';
import { sample, input } from './inputs';
import { runGame } from './part_a';
import { winnersTotal } from './part_b';

test('Part A', t => {
  t.is(runGame(sample), 739785, 'sample');
  t.is(runGame(input), 908595, 'input');
});

test('Part B', t => {
  t.is(winnersTotal(sample), 444356092776315n, 'sample');
  t.is(winnersTotal(input), 91559198282731n, 'input');
});
