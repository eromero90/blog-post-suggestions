type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface HeapNode {
  priority: number;
  featured: boolean;
  component: React.JSX.Element;
}

type PlainHeap = Omit<Heap, FunctionPropertyNames<Heap>>;

class Heap {
  priorityQueue: Array<HeapNode>;

  constructor(params?: Partial<PlainHeap>) {
    this.priorityQueue = params?.priorityQueue ?? [];
  }

  private getParentIdx(childIdx: number): number {
    return Math.floor((childIdx - 1) / 2);
  }

  private getLeftChildIndex(parentIdx: number): number {
    return parentIdx * 2 + 1;
  }

  private getRightChildIndex(parentIdx: number): number {
    return parentIdx * 2 + 2;
  }

  private heapifyUp(nodeIdx: number) {
    if (nodeIdx === 0) {
      return;
    }

    const parentIdx = this.getParentIdx(nodeIdx);
    const parentNode = this.priorityQueue[parentIdx];
    const currentNode = this.priorityQueue[nodeIdx];

    if (parentNode.priority > currentNode.priority) {
      [this.priorityQueue[parentIdx], this.priorityQueue[nodeIdx]] = [
        currentNode,
        parentNode,
      ];
      this.heapifyUp(parentIdx);
    }
  }

  private heapifyDown(nodeIdx: number) {
    const lChildIdx = this.getLeftChildIndex(nodeIdx);

    if (nodeIdx >= this.length || lChildIdx >= this.length) {
      return;
    }

    const rChildIdx = this.getRightChildIndex(nodeIdx);
    const lChild = this.priorityQueue[lChildIdx];
    const rChild = this.priorityQueue[rChildIdx];
    const currentNode = this.priorityQueue[nodeIdx];

    if (
      lChild.priority >= rChild?.priority &&
      currentNode.priority >= rChild?.priority
    ) {
      [this.priorityQueue[rChildIdx], this.priorityQueue[nodeIdx]] = [
        currentNode,
        rChild,
      ];
      this.heapifyDown(rChildIdx);
    } else if (
      rChild?.priority > lChild.priority &&
      currentNode.priority > lChild.priority
    ) {
      [this.priorityQueue[lChildIdx], this.priorityQueue[nodeIdx]] = [
        currentNode,
        lChild,
      ];
      this.heapifyDown(lChildIdx);
    }
  }

  public insert(node: HeapNode): void {
    this.priorityQueue.push(node);
    this.heapifyUp(this.length - 1);
  }

  public extract(): HeapNode | undefined {
    [this.priorityQueue[0], this.priorityQueue[this.length - 1]] = [
      this.priorityQueue[this.length - 1],
      this.priorityQueue[0],
    ];
    const maxPriorityNode = this.priorityQueue.pop();
    this.heapifyDown(0);
    return maxPriorityNode;
  }

  private get length(): number {
    return this.priorityQueue.length;
  }

  public getAsPlainObject(): PlainHeap {
    return {
      priorityQueue: this.priorityQueue,
    };
  }
}

export { Heap, type HeapNode, type PlainHeap, type FunctionPropertyNames };
