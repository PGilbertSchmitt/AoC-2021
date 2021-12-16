// import { concat, sort } from 'ramda';

// Should have had a queue for a while now
export class Queue<T> {
  private inStack: T[];
  private outStack: T[];
  
  constructor() {
    this.inStack = [];
    this.outStack = [];
  };

  push = (...elements: T[]) => {
    this.inStack.push(...elements);
  };

  pop = (): T | undefined => {
    const result = this.outStack.pop();
    if (result !== undefined) return result;

    this.outStack = this.inStack.reverse();
    this.inStack = [];
    return this.outStack.pop();
  };

  // sort = (compare: (a: T, b: T) => number) => {
  //   this.outStack = sort(compare, concat(this.inStack, this.outStack));
  //   this.inStack = 
  // };

  size = (): number => this.inStack.length + this.outStack.length;
};
