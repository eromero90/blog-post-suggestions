import { Heap, HeapNode, PlainHeap } from "./heap";

class CircularHeap {
  priorityQueue: Heap;
  priorityLevels: number;
  private currentBatch: Array<HeapNode>;

  constructor({priorityQueue, priorityLevels}: {priorityQueue: PlainHeap, priorityLevels: number}) {
    this.priorityQueue = new Heap(priorityQueue);
    this.priorityLevels = priorityLevels;
    this.currentBatch = [];
  }

  public nextBatch(totalBatch: number = 3) {
    const prevBatch = [...this.currentBatch];
    this.currentBatch = [];

    for (let index = 0; index < totalBatch; index++) {
      const node = this.priorityQueue.extract();
      if(node){
        this.currentBatch.push(node);
      }
    }

    for (let index = 0; index < totalBatch; index++) {
      const node = prevBatch[index];
      if (node) {
        if (node.featured) {
          node.priority++;
        } else {
          node.priority += this.priorityLevels - 1;
        }
        this.priorityQueue.insert(node);
      }
    }

    return this.currentBatch;
  }
}

export { CircularHeap };
