import { Queue } from '../utils/queue';
import { Grid } from './inputs';

type Coor = [number, number];
type CostMap = Map<number, number>;
type Work = [Coor, number];

const BUFFER_INT = 1000;
const costMapKey = ([a, b]: Coor): number => a * BUFFER_INT + b;

const neighbors = ([x, y]: Coor): Coor[] => {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ];
};

const expand = (grid: Grid, map: CostMap, from: Coor, cost: number): Work[] => {
  const nextPoints = neighbors(from);

  const nextWork: Work[] = [];
  for (const point of nextPoints) {
    const [x, y] = point;
    const nextPointCost = grid[x] && grid[x][y];
    if (nextPointCost === undefined) {
      continue;
    }
    
    const currentPointCost = nextPointCost + cost;
    const key = costMapKey(point);
    const previousPointCost = map.get(key);
    if (previousPointCost === undefined || previousPointCost > currentPointCost) {
      map.set(key, currentPointCost);
      nextWork.push([point, currentPointCost]);
    }
  }

  return nextWork;
};

export const cheapestPath = (input: Grid): number => {
  const endPosition: Coor = [input.length - 1, input[0].length - 1];

  const costMap: CostMap = new Map();

  const workQueue: Queue<Work> = new Queue();
  workQueue.push([[0, 0], 0]);

  // let iter = 0;
  while (workQueue.size() > 0) {
    // if (iter++ % 10000 === 0) {
    //   console.log(`[${iter}] ${workQueue.size()}`);
    // }
    const nextWork = workQueue.pop()!;
    workQueue.push(...expand(input, costMap, ...nextWork));
  }

  return costMap.get(costMapKey(endPosition))!;
};
