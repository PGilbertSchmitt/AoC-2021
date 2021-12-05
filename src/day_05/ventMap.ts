export class VentMap {
  private map: Map<number, number>;
  
  constructor() {
    this.map = new Map();
  }

  addPoint = ([x, y]: [number, number]) => {
    // Individual coordinate values in the input don't exceed 999,
    // This means I don't need to do endless string conversions
    // or expensive hashes, this still ensures I have unique points
    const pointKey = (x * 1000) + y;
    this.map.set(pointKey, (this.map.get(pointKey) || 0) + 1);
  }

  collisions = () => {
    let output = 0;
    for (const value of this.map.values()) {
      value > 1 && output++
    }
    return output;
  }
}