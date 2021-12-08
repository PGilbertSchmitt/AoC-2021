import { difference, intersection, partition, sum } from 'ramda';
import { DigitMap, Segments, Digits } from './digitMap';
import { sample } from './inputs';

const uniqueDigits = (digits: Digits): [Segments, Segments, Segments, Segments] => {
  let one: Segments;
  let four: Segments;
  let seven: Segments;
  let eight: Segments;

  for (const segments of digits) {
    switch (segments.length) {
      case 2:
        one = segments;
        break;
      case 3:
        seven = segments;
        break;
      case 4:
        four = segments;
        break;
      case 7:
        eight = segments;
        break;
    }
  }

  return [one!, four!, seven!, eight!];
};

// Work involving the set of 2, 3, and 5, which all have 5 segments
const fiveSegmentDeduction = (
  digits: Digits,
  TR_BR: Segments,
  CT_TL: Segments
): [Segments, Segments, Segments] => {
  const twoThreeOrFive = digits.filter(segments => segments.length === 5);

  const [[three], twoOrFive] = partition((segments: Segments) => {
    // 3 shares both segments with TR_BR while 2 and 5 only share 1
    return intersection(TR_BR, segments).length === 2;
  }, twoThreeOrFive);

  const [[five], [two]] = partition((segments: Segments) => {
    // 5 shares both segments with CT_TL while 2 only shares 1
    return intersection(CT_TL, segments).length === 2;
  }, twoOrFive);

  return [two, three, five];
};

const sixSegmentDeduction = (
  digits: Digits,
  TR_BR: Segments,
  CT_TL: Segments
): [Segments, Segments, Segments] => {
  const sixNineOrZero = digits.filter(segments => segments.length === 6);

  const [[six], nineOrZero] = partition((segments: Segments) => {
    // 6 only shares 1 segment with TR_BR (no TR segment) while 9 and 0 have both
    return intersection(TR_BR, segments).length === 1;
  }, sixNineOrZero);

  const [[nine], [zero]] = partition((segments: Segments) => {
    // 9 shares both segments with CT_TL while 0 only shares 1
    return intersection(CT_TL, segments).length === 2;
  }, nineOrZero);

  return [six, nine, zero];
};

/**
 * Notes:
 */
const determineSegments = (allDigits: string): DigitMap => {
  const digits: Digits = allDigits.split(' ').map(digit => digit.split(''));
  const map = new DigitMap();

  /* Get digits with unique segment counts */
  const [one, four, seven, eight] = uniqueDigits(digits);
  map.set(one, "1");
  map.set(four, "4");
  map.set(seven, "7");
  map.set(eight, "8");

  /* In order to figure out the rest, we only need 2 segment pairs */

  // Top Right & Bottom Right
  const TR_BR = intersection(seven, one);
  // Center & Top Left
  const CT_TL = difference(four, one);

  const [two, three, five] = fiveSegmentDeduction(digits, TR_BR, CT_TL);
  map.set(two, "2");
  map.set(three, "3");
  map.set(five, "5");

  const [six, nine, zero] = sixSegmentDeduction(digits, TR_BR, CT_TL);
  map.set(six, "6");
  map.set(nine, "9");
  map.set(zero, "0");

  return map;
};

export const sumOfSegmentDisplays = (signals: string[]): number => {
  return sum(signals.map(signal => {
    const [allDigits, displayDigitSegments] = signal.split(' | ');
    const digitMap = determineSegments(allDigits);
    const displayDigits = displayDigitSegments.split(' ').map(segmentString => {
      return digitMap.get(segmentString.split(''));
    });
    return parseInt(displayDigits.join(''));
  }));
};

sumOfSegmentDisplays(sample);
