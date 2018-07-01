import { Injectable } from '@angular/core';
import {EventEmitter, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninemitterService {
  @Output() fire: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChangeObserver: EventEmitter<any> = new EventEmitter<any>();
  data: any;
  constructor() { }
  change() {
    this.fire.emit(false);
  }
  getEmittedValue() {
    return this.fire;
  }
  setData(data: boolean) {
    this.data = data;
    this.dataChangeObserver.emit(this.data);
    return this.dataChangeObserver;
  }


}
