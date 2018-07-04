import { Component, OnInit } from '@angular/core';
import {EventSection} from './EventSection';
import {EventService} from '../../Services/event.service';
import {Event} from './Event';
import {AuthService} from '../../Services/auth.service';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { from } from 'rxjs';

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
  authS: AuthService;
  userisHere: boolean;
  uid: string;
  user: any;
  constructor(eventService: EventService, authS: AuthService) {
    this.eventService = eventService;
    this.authS = authS;
    this.uid = '';
  }

  ngOnInit() {
    this.allEvents = from(this.eventService.getEvents());
      this.authS.user.subscribe((user) => {
        if (user !== undefined && user !== null) {
          this.user = user;
          this.uid = user.uid;
          console.log(this.user.email);
        }
    });
  }

  getDate(dateM: number) {
    const date = new Date(dateM);
    const dateArray = date.toString().split(' ');
    // dateArray[1] + ' ' + dateArray[2];
    return dateArray;
  }

}
