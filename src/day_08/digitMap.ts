import { sort } from "ramda";

export type Segments = string[];
export type Digits = Segments[];

export class DigitMap {
  private _map: Map<string, string>;

  constructor() {
    this._map = new Map();
  }

  // The segment decoding is a step-by-step process where I'll only ever pull a digit
  // when I'm sure it's in the map, so I'm using a `!` for convenience.
  get = (segments: Segments) => this._map.get(this.segmentKey(segments))!;

  set = (segments: Segments, digit: string) =>
    this._map.set(this.segmentKey(segments), digit);

  // Sorting the segments before storage means the order of the segments is irrelevant
  // I don't like doing all this sorting, but
  // - it does avoid some unnecessary complexity,
  // - the strings will never have a length more than 7
  // - There will only be 10 sets and 4 gets per entry
  private segmentKey = (str: string[]): string => {
    return sort((a, b) => a.localeCompare(b), str).join("");
  };
}
