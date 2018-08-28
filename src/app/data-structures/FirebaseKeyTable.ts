import {BehaviorSubject, Observable} from 'rxjs';

export class FirebaseKeyTable<T> {
  private data = {};
  private liveData = new BehaviorSubject([]);
  add(key: string, value: T) {
    this.data[key] = value;
    this.liveData.next(this.getList());
  }
  remove(key: string): T {
    const value = this.data[key];
    delete this.data[key];
    return value;
  }
  get(key: string): Event {
    return this.data[key];
  }
  getData(): Observable<T[]> {
    return this.liveData.asObservable();
  }
  getList(): T[] {
    const list = [];
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        list.push(this.data[key]);
      }
    }
    return list;
  }
}
