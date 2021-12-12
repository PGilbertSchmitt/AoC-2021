import { partition, sum } from "ramda";

type NodeType = 'small' | 'large';

interface Node {
  type: NodeType;
  id: string;
  connections: Node[];
}

type NodeMap = Map<string, Node>;

type VisitSet = Set<string>;

const toNode = (name: string): Node => ({
  id: name,
  // start and end will count as 'small' caves, which is good
  type: name.toLowerCase() === name ? 'small' : 'large',
  connections: []
});

const getOrMakeNode = (map: NodeMap) => (name: string): Node => {
  const existing = map.get(name);
  if (existing) return existing;
  const newNode = toNode(name);
  map.set(name, newNode);
  return newNode;
};

const exploreCave = (visited: VisitSet, node: Node, didRevisit: boolean): number => {
  if (node.id === 'end') {
    return 1;
  }

  // If we got here, we need to make sure we don't visit again unless we have to
  if (node.type === 'small') {
    visited.add(node.id);
  }

  // Get all possible next locations
  const [previsited, unvisited] = partition(({ id }) => visited.has(id), node.connections);

  let revisitedPaths = 0;
  if (!didRevisit) {
    revisitedPaths = sum(previsited.map(nextNode => {
      // Can't revisit 'start' ever
      return nextNode.id === 'start' ? 0 : exploreCave(new Set(visited), nextNode, true)
    }))
  }

  // Recursively find more paths (if `toVisit` is empty, it returns 0);
  return revisitedPaths + sum(unvisited.map(nextNode => exploreCave(new Set(visited), nextNode, didRevisit)));
}

export const getPathCount = (edges: string[], withRevisit: boolean): number => {
  // First things first, build the map of all nodes to each other
  const nodeMap: NodeMap = new Map();
  for (const edge of edges) {
    const [a, b] = edge.split('-').map(getOrMakeNode(nodeMap));
    a.connections.push(b);
    b.connections.push(a);
  }

  return exploreCave(new Set(), nodeMap.get('start')!, !withRevisit);
};
