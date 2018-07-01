import { Component, OnInit } from '@angular/core';
import {EventSection} from './EventSection';
import {EventService} from '../../Services/event.service';
import {Event} from './Event';
import {AuthService} from '../../Services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  sections: EventSection[]; // This holds event sections which all contain arrays of events
  events: EventSection[];
  eventService: EventService;
  authS: AuthService;
  userisHere: boolean;
  constructor(eventService: EventService, authS: AuthService) {
    this.eventService = eventService;
    this.authS = authS;
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        this.userisHere = true;
      }
    });
    if (this.userisHere === false){
      this.authS.signinAno();
    }

    this.eventService.getEvents().then((events) => {
      this.events = events;
    });
    console.log(this.events);
  }

  getDate(dateM: number) {
    const date = new Date(dateM);
    const dateArray = date.toString().split(' ');
    // dateArray[1] + ' ' + dateArray[2];
    return dateArray;
  }

}
