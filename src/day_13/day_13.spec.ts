import test from 'ava';
import { input, sample } from './inputs';
import { pointsAfterFirstFold } from './part_a';
import { processAllFolds } from './part_b';

const expectedPrintSample = `
#####
#...#
#...#
#...#
#####
`.trim();

// BFKRCJZU
// It was easier to check the printable output than to search it for characters
// programatically
const expectedPrintInput = `
###..####.#..#.###...##....##.####.#..#
#..#.#....#.#..#..#.#..#....#....#.#..#
###..###..##...#..#.#.......#...#..#..#
#..#.#....#.#..###..#.......#..#...#..#
#..#.#....#.#..#.#..#..#.#..#.#....#..#
###..#....#..#.#..#..##...##..####..##.
`.trim();

test('Part A', t => {
  t.is(pointsAfterFirstFold(sample), 17, 'sample');
  t.is(pointsAfterFirstFold(input), 842, 'input');
});

test('Part B', t => {
  t.is(processAllFolds(sample), expectedPrintSample, 'sample');
  t.is(processAllFolds(input), expectedPrintInput, 'input');
});
