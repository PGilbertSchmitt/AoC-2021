import { sum } from 'ramda';

export class Board {
  private raw: number[][];
  private positionMap: Map<number, [number, number]>;
  private unmarked: Set<number>;  

  private rows: number[][] = [
    [],
    [],
    [],
    [],
    []
  ];

  private cols: number[][] = [
    [],
    [],
    [],
    [],
    []
  ];

  constructor(raw: number[][]) {
    this.raw = raw;
    this.positionMap = new Map();
    this.unmarked = new Set();
    this.compilePositions();
  }

  public push = (draw: number): number => {
    this.unmarked.delete(draw);
    const pos = this.positionMap.get(draw);
    if (!pos) { return 0; }
    const [x, y] = pos;

    const addToRow = this.rows[y];
    addToRow.push(draw);
    const addToCol = this.cols[x];
    addToCol.push(draw);

    if (addToRow.length === 5) {
      return this.calculateScore(draw);
    };
    if (addToCol.length === 5) {
      return this.calculateScore(draw);
    };

    return 0;
  };

  private calculateScore = (draw: number): number => {
    return sum(Array.from(this.unmarked.keys())) * draw;
  }

  private compilePositions = () => {
    for (let y = 0; y < 5; y++) {
      const row = this.raw[y];
      for (let x = 0; x < 5; x++) {
        const value = row[x];
        this.positionMap.set(value, [x, y]);
        this.unmarked.add(value);
      }
    }
  }
}