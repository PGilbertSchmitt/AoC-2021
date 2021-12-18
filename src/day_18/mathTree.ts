import { Input } from "./input";

export type Leaf = {
  type: 'leaf';
  parent: Branch;
  value: number;
}

export type Branch = {
  type: 'branch';
  parent: Branch | null;
  left: Leaf | Branch;
  right: Leaf | Branch;
}

export type Node = Branch | Leaf;

const toLeaf = (value: number, parent: Branch): Leaf => ({ type: 'leaf', parent, value });

export const parse = ([left, right]: Input, parent: Branch | null): Branch => {
  const branch: Partial<Branch> = {
    type: 'branch',
    parent,
  };
  const leftChild = typeof left === 'number' ? toLeaf(left, branch as Branch) : parse(left, branch as Branch);
  const rightChild = typeof right === 'number' ? toLeaf(right, branch as Branch) : parse(right, branch as Branch);
  branch.left = leftChild;
  branch.right = rightChild;
  return branch as Branch;
};

// Recurses down the tree to find the right-most leaf
const rightMostLeaf = (node: Node): Leaf => {
  if (node.type === 'leaf') return node;
  return rightMostLeaf(node.right);
};

// Recurses up the tree to find a parent where the input node has a left sibling (or null)
const nextLeftLeaf = (node: Leaf | Branch): Leaf | null => {
  const parent = node.parent;
  if (parent === null) { return null; }

  if (node === parent.right) {
    return rightMostLeaf(parent.left);
  } else {
    return nextLeftLeaf(parent);
  }
};

// Recuses down the tree to find the left-most leaf
const leftMostLeaf = (node: Node): Leaf => {
  if (node.type === 'leaf') { return node; }
  return leftMostLeaf(node.left);
};

// Recurses up the tree to find a parent where the input node has a left sibling (or null)
const nextRightLeaf = (node: Leaf | Branch): Leaf | null => {
  const parent = node.parent;
  if (parent === null) { return null; }

  if (node === parent.left) {
    return leftMostLeaf(parent.right);
  } else {
    return nextRightLeaf(parent);
  }
};

const leftMostPairAtMinDepth = (branch: Branch, depth: number): Branch | null => {
  if (branch.left.type === 'branch') { 
    const pair = leftMostPairAtMinDepth(branch.left, depth - 1);
    if (pair !== null) { return pair; }
  }

  if (branch.right.type === 'branch') {
    const pair = leftMostPairAtMinDepth(branch.right, depth - 1);
    if (pair !== null) { return pair; }
  }

  // If neither of the above proc, it's because we only have leaves, only return self if at the right depth
  if (depth < 1) {
    return branch;
  }

  return null;
}

const splitableLeaf = (node: Node): Leaf | null => {
  if (node.type === 'leaf') {
    return node.value > 9 ? node : null;
  }
  return splitableLeaf(node.left) || splitableLeaf(node.right);
}

// Attempts to perform an explosion, returning whether or not it occured
const explode = (branch: Branch): boolean => {
  const pair = leftMostPairAtMinDepth(branch, 4);
  if (pair === null) return false;

  // The children of `leftMostPairAtMinDepth`'s return are always leaves
  const leftValue = (pair.left as Leaf).value;
  const rightValue = (pair.right as Leaf).value;
  
  // Add values if possible
  const leftSibling = nextLeftLeaf(pair);
  const rightSibling = nextRightLeaf(pair);

  leftSibling && (leftSibling.value += leftValue);
  
  rightSibling && (rightSibling.value += rightValue);

  // Replace pair with value 0
  const parent = pair.parent!; // Guaranteed to have parent since it was 4 deep at minimum
  const newLeaf = toLeaf(0, parent);
  pair === parent.left
    ? parent.left = newLeaf
    : parent.right = newLeaf;
  
  return true;
};

// // Attempts to perform a split, returning whether or not it occured
const split = (branch: Branch): boolean => {
  const splittablePair = splitableLeaf(branch);
  if (splittablePair === null) {
    return false;
  }
  const halfValue = splittablePair.value / 2;

  // Replace the pair's parent with a new branch
  const parent = splittablePair.parent;
  const newBranch: Partial<Branch> = {
    type: 'branch',
    parent
  };
  const left = toLeaf(Math.floor(halfValue), newBranch as Branch);
  const right = toLeaf(Math.ceil(halfValue), newBranch as Branch);
  newBranch.left = left;
  newBranch.right = right;

  splittablePair === parent.left
    ? parent.left = (newBranch as Branch)
    : parent.right = (newBranch as Branch);

  return true;
};

export const reduceTree = (branch: Branch) => {
  while (explode(branch) || split(branch)) {}
};

export const treeToString = (node: Node): string => {
  if (node.type === 'leaf') return node.value.toString();
  return `[${treeToString(node.left)},${treeToString(node.right)}]`;
};
