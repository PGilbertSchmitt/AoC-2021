import { Input } from './input';
import { parse, reduceTree, Branch, Node } from './mathTree';

const addBranches = (
  left: Node,
  right: Node
): Branch => {
  const branch: Partial<Branch> = {
    type: 'branch',
    parent: null,
  };
  left.parent = branch as Branch;
  right.parent = branch as Branch;

  branch.left = left;
  branch.right = right;

  return branch as Branch;
};

const sum = (lines: Input[]): Branch => {
  const trees = lines.map(line => parse(line, null));
  const [first, second, ...rest] = trees;

  let currentSum = addBranches(first, second);
  reduceTree(currentSum);
  for (let branch of rest) {
    currentSum = addBranches(currentSum, branch);
    reduceTree(currentSum);
  }
  return currentSum;
};

export const magnitude = (node: Node): number => {
  if (node.type === 'leaf') return node.value;
  return (3 * magnitude(node.left)) + (2 * magnitude(node.right));
};

export const totalMagnitude = (lines: Input[]): number => {
  return magnitude(sum(lines));
};
