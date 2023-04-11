export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface INodeList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
  getArr: () => T[];
}

export class LinkedListNode<T> implements INodeList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(arr: T[]) {
    this.head = null;
    this.size = 0;
    arr.forEach((item) => this.append(item));
  }

  append(item: T) {
    const node = new Node(item);
    let curr;

    if (this.head === null) {
      this.head = node;
    } else {
      curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  prepend(item: T): void {
    const node = new Node(item, this.head);

    this.head = node;
    this.size++;
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteTail() {
    let curr;
    if (!this.head?.next) {
      this.head = null;
    } else {
      curr = this.head;
      while (curr.next?.next) {
        curr = curr.next;
      }
      curr.next = null;
    }
    this.size--;
  }

  addByIndex(item: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    if (!this.head || index <= 0) {
      this.prepend(item);
    } else if (index >= this.size - 1) {
      this.append(item);
    } else {
      let curr = this.head;
      let currIndex = 0;

      while (currIndex !== index - 1 && curr.next) {
        curr = curr.next;
        currIndex++;
      }

      const node = new Node(item, curr.next);
      curr.next = node;
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    let curr = this.head;
    if (index === 0) {
      if (this.head) this.head = this.head?.next;
    } else {
      let prev = null;
      let currIndex = 0;
      while (currIndex++ < index) {
        prev = curr;
        if (curr) {
          curr = curr.next;
        }
      }
      if (prev?.next) prev.next = curr?.next ? curr.next : null;
    }
    this.size--;
  }

  getSize() {
    return this.size;
  }

  getArr() {
    let curr = this.head;
    let arr: T[] = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}

export const randomInt = (min: number, max: number): string => {
  return String(Math.floor(min + Math.random() * (max + 1 - min)));
};

export const randomArr = (length: number): string[] => {
  return Array.from({ length }, () => {
    return randomInt(0, 100);
  });
};
