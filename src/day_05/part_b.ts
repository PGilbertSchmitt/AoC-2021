import { Line } from './inputs';
import { VentMap } from './ventMap';
import { horizontalLine, verticalLine, diagonalLine } from './util';

export const findVentCollisions = (lines: Line[]) => {
  const ventMap = new VentMap();
  
  for (const line of lines) {
    const { a, b } = line;
    if (a.x === b.x) {
      verticalLine(a, b).map(ventMap.addPoint);
    } else if (a.y === b.y) {
      horizontalLine(a, b).map(ventMap.addPoint);
    } else {
      diagonalLine(a, b).map(ventMap.addPoint);
    }
  }

  return ventMap.collisions();
}