import {Node} from './Node';
import {deepEqual} from 'deep-equal';

export class LinkedList<T> {
  private data: T[];
  private head: Node<T>;
  private tail: Node<T>;
  constructor() {
    this.data = [];
    this.head = null;
    this.tail = null;
  }
  isEmpty(): boolean {
    return this.head === null;
  }
  getFirst(): T {
    return this.head.value;
  }
  getLast(): T {
    return this.tail.value;
  }
  removeFirst(): T {
    this.head = this.head.next;
    return this.head.value;
  }
  removeLast(): T {
    if (this.isEmpty()) { return null; }
    const size = this.data.length - 1;
    const value = this.data[size];
    this.data.splice(size, 1);
    return value;
  }
  add(value: T) {
    const node = new Node<T>(value);
    if (this.head == null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
  }
  size(): number {
    return this.data.length;
  }
  clear() {
    this.data.length = 0;
  }
  toArray(): T[] {
    const values: T[] = [];
    this.data.forEach(v => {
      values.push(v);
    });
    return values;
  }
  fromArray(data: T[]): LinkedList<T> {
    data.forEach(v => {
      this.add(v);
    });
    return this;
  }
}
