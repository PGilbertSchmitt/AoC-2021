import { performance } from 'perf_hooks';
import { isNil, sum } from 'ramda';
import { MinHeap } from '../utils/min_heap';
import { Grid } from "./inputs";

type Coor = [number, number];

const BUFFER_INT = 1000;
const coorToKey = ([a, b]: Coor): number => a * BUFFER_INT + b;

const neighbors = ([x, y]: Coor): Coor[] => {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ];
};

// Manhattan distance between a point and the end point
const createHeuristic = ([endX, endY]: Coor) => ([curX, curY]: Coor) => {
  return endX - curX + endY - curY;
};

const aStar = (end: Coor, grid: Grid): number => {
  const heuristic = createHeuristic(end);
  const endKey = coorToKey(end);
  const explored = new Set<number>();
  const priorityQueue = new MinHeap<Coor>();
  const nodeMap = new Map<number, {
    minCost: number,
    priority: number,
    lastCoordinate: Coor | null
  }>();
  const d1: number[] = [];
  const d2: number[] = [];

  // The first coordinate [0,0] has a key of 0 and a priority of 0
  priorityQueue.push(0, [0, 0]);
  nodeMap.set(0, {
    minCost: 0,
    priority: 0,
    lastCoordinate: null
  });

  while (priorityQueue.notEmpty()) {
    const currentCoor = priorityQueue.pop();
    const currentNodeKey = coorToKey(currentCoor);
    const currentNode = nodeMap.get(currentNodeKey)!; // Guaranteed to be here (probably)
    if (currentNodeKey === endKey) {
      console.log(`D1: ${sum(d1) / d1.length}ms average`);
      console.log(`D2: ${sum(d2) / d2.length}ms average`);
      return currentNode.minCost;
    }
    if (explored.has(currentNodeKey)) { continue; }
    
    const nextNodes = neighbors(currentCoor)
    for (const nodeCoor of nextNodes) {
      const t0 = performance.now();
      const [x, y] = nodeCoor;
      const nodeKey = coorToKey(nodeCoor);
      
      if (!isNil(grid[x] && grid[x][y]) && !explored.has(nodeKey)) {
        const t1 = performance.now();
        const nextNode = nodeMap.get(nodeKey);
        const nodeCost = currentNode.minCost + grid[x][y];
        const t2 = performance.now();
        if (nodeCost < (nextNode?.minCost || Infinity)) {
          const priority = nodeCost + heuristic(nodeCoor);
          nodeMap.set(nodeKey, {
            lastCoordinate: currentCoor,
            minCost: nodeCost,
            priority
          });
          priorityQueue.push(priority, nodeCoor);
        }
        d1.push(t1 - t0);
        d2.push(t2 - t1);
      }
    }


    explored.add(currentNodeKey)
  }

  throw new Error('BAD, RAN OUT OF NODES');
};

export const findShortestPathCost = (input: Grid): number => {
  const endPosition: Coor = [input.length - 1, input[0].length - 1];
  return aStar(endPosition, input);
};
