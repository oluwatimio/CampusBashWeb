import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {EventSection} from '../event-view/event/EventSection';
import {Event} from '../event-view/event/Event';

@Injectable()
export class EventService {
  eventTypes = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk', 'Festiva']
  constructor() { }

  getEvents() {
    const db = firebase.firestore();
    const events = new Array();
      db.collection('events').onSnapshot((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            const event = new Event(doc.data().address,
              doc.data().creator, doc.data().description, doc.data().endTime,
              doc.data().eventId, doc.data().eventName, doc.data().eventType,
              doc.data().eventVideo, doc.data().placeId, doc.data().placeholderImage,
              doc.data().startTime, doc.data().tickets, doc.data().timezone,
              doc.data().university);
            events.push(event);
        });
      });
      return events;
    }

}
