import { dropLast } from "ramda";

export type Range = [number, number];
export interface Volume {
  x: Range;
  y: Range;
  z: Range;
}

// Checks if value is in range start..end inclusive
const between = (value: number, start: number, end: number): boolean => {
  return start <= value && value <= end;
};

// Given a base range and a subtraction range, find the new ranges that determine the
// bounding boxes for the output shapes. The intersecting range is placed last so that
// when several ranges are permutated against each other to get the new volumes, the
// last permutation is the intersecting volume. If the subtracting range encompasses
// the base range entirely, the output is the baseRange (as the full range is the
// intersection). If there is no intersection at all, the output is an emtpy array.
const divideRanges = ([start1, end1]: Range, [start2, end2]: Range): Range[] => {
  // If base entirely within other range, return only base range.
  if (between(start1, start2, end2) && between(end1, start1, end2)) {
    return [[start1, end1]];
  } 

  const newRanges: Range[] = [];

  // Find the first normal split based on start2
  if (between(start2, start1, end1)) {
    newRanges.push(
      [start1, start2-1],
      [start2, end1] // intersecting range
    );
  }

  // Check if the first split happened
  if (newRanges.length == 2) {
    // If so, check for a split based on end2 inside the new [start2, end1] range
    // (last element in the newRanges array)
    if (between(end2, start2, end1)) {
      newRanges.pop();
      newRanges.push(
        [end2+1, end1],
        [start2, end2] // intersecting range
      );
    }
  } else {
    // This is the only split, split normally on end2
    if (between(end2, start1, end1)) {
      newRanges.push(
        [end2+1, end1],
        [start1, end2] // intersecting range
      );
    }
  }

  return newRanges;
};

// Subtracts the `remove` volume from the `base` volume, creating several new volumes
// that used to be encompassed by `base`, minus the intersecting volume.
export const newVolumes = (base: Volume, remove: Volume) => {
  const xRanges = divideRanges(base.x, remove.x);
  if (xRanges.length === 0) {
    return [base];
  }
  const yRanges = divideRanges(base.y, remove.y);
  if (yRanges.length === 0) {
    return [base];
  }
  const zRanges = divideRanges(base.z, remove.z);
  if (zRanges.length === 0) {
    return [base];
  }

  const newVolumes: Volume[] = [];
  // If we got here, there are intersections, so permute to find the new volumes
  for (const x of xRanges) {
    for (const y of yRanges) {
      for (const z of zRanges) {
        newVolumes.push({x,y,z});
      }
    }
  }

  // The last volume is the intersecing volume, so it's not included in the output.
  // That means if the `base` was encompassed entirely by the `remove` volume, the
  // output is an empty array, which means the `base` volume is effectively deleted.
  return dropLast(1, newVolumes);
};

export const volumeSize = ({x, y, z}: Volume): bigint => {
  // The ranges should all be maintained in order
  return BigInt(x[1] - x[0] + 1) * BigInt(y[1] - y[0] + 1) * BigInt(z[1] - z[0] + 1);
};
