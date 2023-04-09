interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  getHead: () => number;
  getTail: () => number;
  getSize: () => number;
  getQueue: () => Array<T | undefined>;
  getLength: () => number;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  //--добавление в конец очереди--//
  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  //--удаление первого из очереди--//
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = undefined;
    this.length--;
    this.head++;
  };

  isEmpty = () => this.length === 0;

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };

  getHead = () => this.head;
  getTail = () => this.tail;
  getSize = () => this.size;
  getQueue = () => [...this.container];
  getLength = () => this.length;
}

export const queue = new Queue<string>(7);
