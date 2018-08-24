import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {Event} from '../event-view/event/Event';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AddeventService {
  constructor(public snackbar: MatSnackBar) {

  }

  addEvent(event: Event) {
    const db = firebase.firestore();

    db.collection('events').add({
      address: event.address,
      creator: event.creator,
      description: event.description,
      endTime: event.endTime,
      eventId: event.eventId,
      eventName: event.eventName,
      eventType: event.eventType,
      eventVideo: event.eventVideo,
      placeId: event.placeId,
      placeholderImage: event.placeholderImage,
      startTime: event.startTime,
      tickets: event.tickets
    }).then(() => {
      this.snackbar.open('Event Added', null, {
        duration: 5000,
      });
    });
  }
}
