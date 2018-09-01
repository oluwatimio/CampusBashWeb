import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventfilteringService {
  private universitySelected = new Subject<any>();
  constructor() {

  }

  selectUni(uni: string) {
    this.universitySelected.next({university: uni});
  }

  clearUni() {
    this.universitySelected.next();
  }

  getUni(): Observable<any> {
    return this.universitySelected.asObservable();
  }

}
