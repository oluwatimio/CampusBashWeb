import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {EventSection} from '../event-view/event/EventSection';
import {Event} from '../event-view/event/Event';
import {MatSnackBar} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {FirebaseKeyTable} from '../data-structures/FirebaseKeyTable';
import {isNullOrUndefined} from 'util';
import {User} from '../Classes/User';
import {Util} from '../Util';
import {Constants} from '../Constants';
import {EventfilteringService} from '../eventfiltering.service';

@Injectable()
export class EventService {
  eventTypes = ['Frosh', 'House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk', 'Festival'];
  sections: EventSection[] = new Array();
  events: Event[] = new Array();
  private eventsTable: FirebaseKeyTable<Event>;
  private myEventsTable: FirebaseKeyTable<Event>;
  private searchSubject = new BehaviorSubject(null);
  private sectionSubject = new BehaviorSubject(null);
  private ticketSource = new BehaviorSubject(null);
  private unSubscribe;
  private lastUniversity = '';
  private lastEventFetched = null;
  private eventFetched = new BehaviorSubject(null);
  efs: EventfilteringService;
  constructor(public sb: MatSnackBar, efs: EventfilteringService) {
    this.eventsTable = new FirebaseKeyTable();
    this.myEventsTable = new FirebaseKeyTable();
    this.efs = efs;
    this.eventsTable.getData().subscribe((data: Event[]) => {
      this.events = data;
      this.sectionSubject.next(this.getSections());
      this.updateLastFetched();
    });
    this.myEventsTable.getData().subscribe((data: Event[]) => {
      this.events = data;
      this.updateLastFetched();
    });
    this.efs.getUni().subscribe(uni => {
      if (!isNullOrUndefined(uni) && !isNullOrUndefined(uni.university)) {
        this.downloadEvents(uni);
        this.lastUniversity = uni.university;
      }
    });
  }
  addEventToTable(event: Event, myEvent: boolean = false) {
    if (myEvent) {
      this.myEventsTable.add(event.eventId, event);
    } else {
      this.eventsTable.add(event.eventId, event);
    }
  }
  getEvents(): Observable<EventSection[]> {
    return this.sectionSubject.asObservable();
  }
  getEvent(eventId: string): Observable<Event> {
    this.lastEventFetched = eventId;
    let value = this.eventsTable.get(eventId);
    if (isNullOrUndefined(value)) {
      value = this.myEventsTable.get(eventId);
    }
    console.log(value);
    this.eventFetched.next(value);
    if (isNullOrUndefined(value)) {
      this.downloadEventById(eventId);
    }
    return this.eventFetched.asObservable();
  }
  private updateLastFetched() {
    if (isNullOrUndefined(this.lastEventFetched)) { return; }
    let value = this.eventsTable.get(this.lastEventFetched);
    if (isNullOrUndefined(value)) {
      value = this.myEventsTable.get(this.lastEventFetched);
    }
    console.log(value);
    this.eventFetched.next(value);
  }
  downloadEvents(uni: any = {university: 'University of Ottawa'}) {
    console.log('d events');
    console.log(uni);
    if (!isNullOrUndefined(this.unSubscribe)) {
      this.unSubscribe();
    }
    const db = firebase.firestore();
    this.unSubscribe = db.collection('events').where('endTime', '>=', Date.now())
      .where('university', '==', uni.university)
      .onSnapshot((querySnapshot) => {
        this.eventsTable.clear();
        querySnapshot.forEach((doc) => {
          const event = new Event(doc.data().address,
            doc.data().creator, doc.data().description, doc.data().endTime,
            doc.data().eventId, doc.data().eventName, doc.data().eventType,
            doc.data().eventVideo, doc.data().placeId, doc.data().placeholderImage,
            doc.data().startTime, doc.data().tickets, doc.data().timezone,
            doc.data().university, doc.data().ticketsSold);
          this.eventsTable.add(event.eventId, event);
        });

        console.log(this.events);
      });
  }
  downloadEventById(eventId: string) {
    if (isNullOrUndefined(eventId)) { return; }
    const db = firebase.firestore();
    const subscription = db.collection('events').doc(eventId).onSnapshot(doc => {
      if (!doc.exists) {
        subscription();
        return;
      }
      const event = new Event(doc.data().address,
        doc.data().creator, doc.data().description, doc.data().endTime,
        doc.data().eventId, doc.data().eventName, doc.data().eventType,
        doc.data().eventVideo, doc.data().placeId, doc.data().placeholderImage,
        doc.data().startTime, doc.data().tickets, doc.data().timezone,
        doc.data().university, doc.data().ticketsSold);
      this.eventsTable.add(eventId, event);
      subscription();
    });
  }
  getSections() {
    const froshParty = new Array();
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
      } else if (this.events[i].eventType === 'Frosh') {
        froshParty.push(this.events[i]);
      }
    }
    const froshSection = new EventSection('Frosh', froshParty);
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
    this.sections = [froshSection, eSect, poolSect, keggerSect, sportsSect, confSect, concertSect, tournSect, netSect, seminarSect,
      festSect];
    return this.sections;
  }
  getEventsHosting(uid: string) {
    if (!isNullOrUndefined(uid) && uid.trim().length > 0) {
      const db = firebase.firestore();
      db.collection('events').where('creator.uid', '==', uid).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const event = new Event(doc.data().address,
            doc.data().creator, doc.data().description, doc.data().endTime,
            doc.data().eventId, doc.data().eventName, doc.data().eventType,
            doc.data().eventVideo, doc.data().placeId, doc.data().placeholderImage,
            doc.data().startTime, doc.data().tickets, doc.data().timezone,
            doc.data().university, doc.data().ticketsSold);
          this.myEventsTable.add(event.eventId, event);
        });
      });
    }
    return this.myEventsTable.getData();
  }
  addEvent(event: Event) {
    const db = firebase.firestore();
    const ev = {
      eventId: event.eventId,
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
      tickets: event.tickets,
      ticketsSold: event.ticketsSold,
      timeZone: event.timeZone,
      university: event.university
    };
    console.log(ev);
    const ref = db.collection('events').doc();
    ev.eventId = ref.id;
    ref.set(ev).then(() => {
        this.sb.open('Event Added', null, {duration: 5000});
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
  getTicketMessage() {
    return this.ticketSource.asObservable();
  }
  changeTicketMessage(data) {
    this.ticketSource.next(data);
  }
  async addTicket(ticketData: any, event: Event): Promise<Boolean> {
    try {
      const db = firebase.firestore();
      await db.collection('events').doc(event.eventId)
        .collection('tickets').add(ticketData);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
  buildTicketPayload(ticketFee: number, ticketData: any, cardToken: string, user: User): any {
    if (user === null) {
      return null;
    }
    let quantity = 0;
    for (const key in ticketData) {
      if (!ticketData.hasOwnProperty(key)) {
        continue;
      }
      quantity += ticketData[key];
    }

    if (quantity <= 0) {
      return null;
    }
    const bd = Util.getTicketBreakdown(ticketFee);
    let stripeAcctId = null;
    let stripeCustId = null;
    if (!isNullOrUndefined(user.stripeAccountId)) {
      stripeAcctId = user.stripeAccountId;
    }
    if (!isNullOrUndefined(user.stripeCustomerId)) {
      stripeCustId = user.stripeCustomerId;
    }
    return {
      buyerId: user.uid,
      buyerEmail: user.email,
      buyerName: user.userName,
      currency: 'CA$',
      quantity: quantity,
      stripeAccountId: stripeAcctId,
      stripeCustomerId: stripeCustId,
      token: cardToken,
      timeSpent: Date.now(),
      total: bd[Constants.TOTAL_FEE],
      breakdown: bd,
      tickets: ticketData
    };
  }
}
