import {Component, NgZone, OnInit} from '@angular/core';
import {EventSection} from './EventSection';
import {EventService} from '../../Services/event.service';
import {Event} from './Event';
import {AuthService} from '../../Services/auth.service';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { from } from 'rxjs';
import { Router } from '../../../../node_modules/@angular/router';
import { EventclickedService } from '../../Services/eventclicked.service';
import {delay} from 'q';
import {isNullOrUndefined} from 'util';
import {Preference} from '../../Classes/Preference';
import {EventfilteringService} from '../../eventfiltering.service';
import {logging} from 'selenium-webdriver';
import Preferences = logging.Preferences;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  sections: EventSection[]; // This holds event sections which all contain arrays of events
  events: EventSection[] = new Array();
  allEvents: Observable<EventSection[]>;
  eventService: EventService;
  eventGroups: string[] = new Array();
  authS: AuthService;
  userisHere: boolean;
  uid: string;
  user: any;
  router: Router;
  ng: NgZone;
  userInterests: Preferences[];
  originalArrayOfEvents: EventSection[];
  uniSelected: string;
  efs: EventfilteringService;
  constructor(eventService: EventService, authS: AuthService, router: Router, ng: NgZone, efs: EventfilteringService) {
    this.eventService = eventService;
    this.authS = authS;
    this.uid = '';
    this.router = router;
    this.ng = ng;
    this.efs = efs;
  }

  ngOnInit() {
    this.efs.selectUni('University of Ottawa');
    this.authS.user.subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
        this.uid = user.uid;
        this.getInterests();
      } else if (user === undefined || user === null) {
        this.getEventGroups();
      }
    });
  }

  getDate(dateM: number) {
    const date = new Date(dateM);
    const dateArray = date.toString().split(' ');
    return dateArray;
  }
  getInterests() {

    const db = firebase.firestore();

    db.collection('users').where('uid', '==', this.user.uid)
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.userInterests = doc.data().preference;
        });
        this.allEvents = this.eventService.getEvents();
    });
  }

  getEventGroups() {
    const db = firebase.firestore();

    db.collection('eventGroup').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.eventGroups.push(doc.data().eventType);
      });
      this.allEvents = this.eventService.getEvents();
    });
  }
  checkUni() {
    this.originalArrayOfEvents = this.events;
  }

  filter(events: EventSection[], uni: string) {
    this.events = new Array();
    for (let i = 0; i < events.length; i++) {
      events[i].events = events[i].events.filter((eventN) => {
        return eventN.university === uni;
      });
    }
  }

  async eventDetail(event: Event) {
    this.router.navigateByUrl(`detail/${event.eventId}`);
  }

}
