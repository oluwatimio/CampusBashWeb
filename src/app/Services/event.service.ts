import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {EventSection} from '../event-view/event/EventSection';
import {Event} from '../event-view/event/Event';
import {delay} from 'q';

@Injectable()
export class EventService {
  eventTypes = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk', 'Festival']
  sections: EventSection[] = new Array();
  events: Event[] = new Array();
  constructor() { }

  async getEvents() {
    this.events = new Array();
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
        console.log(this.getSections());

      });
      return this.getSections();
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
      console.log(this.events.length)
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].eventType === 'House Party') {
          console.log(this.events[i])
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

}
