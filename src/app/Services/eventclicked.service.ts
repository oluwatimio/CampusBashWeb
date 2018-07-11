import { Injectable } from '@angular/core';
import {Event} from '../event-view/event/Event';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class EventclickedService {
  currentClicked: Event;
  localStorages: LocalStorage;
  constructor(protected localStorage: LocalStorage) {
    this.localStorages = localStorage;
  }

  setEventClicked(event: Event) {
    //this.currentClicked = event;
    this.localStorages.setItem('event', event).subscribe(() => {
      console.log(event);
    });
  }
  getEventClicked() {
    return this.currentClicked;
  }
}
