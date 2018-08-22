import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {EventSection} from '../event-view/event/EventSection';
import {Event} from '../event-view/event/Event';
import {delay} from 'q';
import {MatSnackBar} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import CollectionReference = firebase.firestore.CollectionReference;
import Query = firebase.firestore.Query;

@Injectable()
export class EventService {
  eventTypes = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk', 'Festival'];
  sections: EventSection[] = new Array();
  events: Event[] = new Array();
  eventsHost: Event[] = new Array();
  searchSubject = new BehaviorSubject(null);
  constructor(public sb: MatSnackBar) {

  }

  async getEvents() {
    await this.downloadEvents();
    return this.getSections();
  }
  async downloadEvents() {
    if (this.events.length > 0) { return; }
    this.events = [];
    const db = firebase.firestore();
    await  db.collection('events').get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        const event = new Event(doc.data().address,
          doc.data().creator, doc.data().description, doc.data().endTime,
          doc.data().eventId, doc.data().eventName, doc.data().eventType,
          doc.data().eventVideo, doc.data().placeId, doc.data().placeholderImage,
          doc.data().startTime, doc.data().tickets, doc.data().timezone,
          doc.data().university);
        this.events.push(event);
      });

      console.log(this.events);
      // console.log(this.events);
      // console.log(this.getSections());
    });
  }

  getSections() {
    const houseParty = new Array();
    const poolParty = new Array();
    const kegger = new Array();
    const sportsParty = new Array();
    const conference = new Array();
    const concert = new Array();
    const tournament = new Array();
    const networking = new Array();
    const seminar = new Array();
    const festival = new Array();
    console.log(this.events.length);
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].eventType === 'House Party') {
        houseParty.push(this.events[i]);
      } else if (this.events[i].eventType === 'Pool Party') {
        poolParty.push(this.events[i]);
      } else if (this.events[i].eventType === 'Kegger') {
        kegger.push(this.events[i]);
      } else if (this.events[i].eventType === 'Sports Party') {
        sportsParty.push(this.events[i]);
      } else if (this.events[i].eventType === 'Conference') {
        conference.push(this.events[i]);
      } else if (this.events[i].eventType === 'Concert or Performance') {
        concert.push(this.events[i]);
      } else if (this.events[i].eventType === 'Tournament') {
        tournament.push(this.events[i]);
      } else if (this.events[i].eventType === 'Networking') {
        networking.push(this.events[i]);
      } else if (this.events[i].eventType === 'Seminar or Talk') {
        seminar.push(this.events[i]);
      } else if (this.events[i].eventType === 'Festival') {
        festival.push(this.events[i]);
      }
    }
    const eSect = new EventSection('House Party', houseParty);
    const poolSect = new EventSection('Pool Party', poolParty);
    const keggerSect = new EventSection('Kegger', kegger);
    const sportsSect = new EventSection('Sports Party', sportsParty);
    const confSect = new EventSection('Conference', conference);
    const concertSect = new EventSection('Concert or Performance', concert);
    const tournSect = new EventSection('Tournament', tournament);
    const netSect = new EventSection('Networking', networking);
    const seminarSect = new EventSection('Seminar or Talk', kegger);
    const festSect = new EventSection('Festival', festival);
    this.sections = [eSect, poolSect, keggerSect, sportsSect, confSect, concertSect, tournSect, netSect, seminarSect, festSect];
    return this.sections;
  }
  async getEventsHosting() {
    this.eventsHost = new Array();
    const db = firebase.firestore();
    await  db.collection('events').get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        const event = new Event(doc.data().address,
          doc.data().creator, doc.data().description, doc.data().endTime,
          doc.data().eventId, doc.data().eventName, doc.data().eventType,
          doc.data().eventVideo, doc.data().placeId, doc.data().placeholderImage,
          doc.data().startTime, doc.data().tickets, doc.data().timezone,
          doc.data().university);
        this.eventsHost.push(event);
      });
    });

    return this.eventsHost;
  }

  addEvent(event: Event) {
    const db = firebase.firestore();

    db.collection('events').add({
      address: event.address,
      creator: event.creator,
      description: event.description,
      endTime: event.endTime,
      eventName: event.eventName,
      eventType: event.eventType,
      eventVideo: event.eventVideo,
      placeId: event.placeId,
      placeholderImage: event.placeholderImage,
      startTime: event.startTime,
      tickets: event.tickets
    }).then((docRef) => {
      db.collection('events').doc(docRef.id).update({
        eventId: docRef.id
      }).then(() => {
        this.sb.open('Event Added', null, {duration: 5000});
      });
    });
  }
  search(name: string, university: string, time: number) {
    const events: Event[] = [];
    this.events.forEach(event => {
      if (event.eventName.toLowerCase().indexOf(name.toLowerCase()) > -1 && event.endTime >= time) {
        if (university.trim().length === 0) {
          events.push(event);
        } else if (event.university === university) {
          events.push(event);
        }
      }
    });
    events.sort((a, b) => {
      return a.endTime - b.endTime;
    });
    this.searchSubject.next(events);
  }
  getSearchObservable(): Observable<Event[]> {
    return this.searchSubject.asObservable();
  }

}
