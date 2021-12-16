interface Node<T> {
  value: number,
  item: T
}

export class MinHeap<T> {
  private heap: Node<T>[];
  private size: number;

  constructor() {
    this.heap = [];
    this.size = 0;
  }

  public peek = (): T => {
    this.ensureNotEmpty();
    // Shallow clone to prevent modifying the node element
    return this.heap[0].item;
  }
  
  public pop = (): T => {
    this.ensureNotEmpty();
    const head = this.heap[0];
    this.heap[0] = this.heap[this.size - 1];
    this.size--;
    this.heapifyDown();
    return head.item;
  };

  public push = (value: number, item: T): void => {
    this.heap[this.size] = {
      value,
      item
    };
    this.size++;
    this.heapifyUp();
  };

  public notEmpty = (): boolean => this.size > 0;

  private ensureNotEmpty = () => {
    if (this.size === 0) throw new Error('Min Heap is empty');
  };

  private leftChildIndex = (index: number): number => (2 * index) + 1;
  private rightChildIndex = (index: number): number => (2 * index) + 2;
  private parentIndex = (index: number): number => Math.floor((index - 1) / 2);

  private hasLeftChild = (index: number): boolean => this.leftChildIndex(index) < this.size;
  private hasRightChild = (index: number): boolean => this.rightChildIndex(index) < this.size;
  private hasParent = (index: number): boolean => index > 0;

  private valueAt = (index: number): number => this.heap[index].value;
  private leftChildValue = (index: number): number => this.valueAt(this.leftChildIndex(index));
  private rightChildValue = (index: number): number => this.valueAt(this.rightChildIndex(index));
  private parentValue = (index: number): number => this.valueAt(this.parentIndex(index));

  private swap = (indexA: number, indexB: number): void => {
    const tmp = this.heap[indexA];
    this.heap[indexA] = this.heap[indexB];
    this.heap[indexB] = tmp;
  };

  // Bubble up the last item until it it's greater than it's parent
  private heapifyUp = (): void => {
    let currentIndex = this.size - 1;
    while (this.hasParent(currentIndex) && (this.parentValue(currentIndex) > this.valueAt(currentIndex))) {
      const parentIndex = this.parentIndex(currentIndex);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  };

  private heapifyDown = (): void => {
    let currentIndex = 0;
    while (this.hasLeftChild(currentIndex)) {
      let lowestValueIndex = this.leftChildIndex(currentIndex);
      if (this.hasRightChild(currentIndex) && this.leftChildValue(currentIndex) > this.rightChildValue(currentIndex)) {
        lowestValueIndex = this.rightChildIndex(currentIndex);
      }

      if (this.valueAt(currentIndex) < this.valueAt(lowestValueIndex)) {
        break;
      }

      this.swap(currentIndex, lowestValueIndex);
      currentIndex = lowestValueIndex;
    }
  };
};
