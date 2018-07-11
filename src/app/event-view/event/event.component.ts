import { Component, OnInit } from '@angular/core';
import {EventSection} from './EventSection';
import {EventService} from '../../Services/event.service';
import {Event} from './Event';
import {AuthService} from '../../Services/auth.service';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { from } from 'rxjs';
import { Router } from '../../../../node_modules/@angular/router';
import { EventclickedService } from '../../Services/eventclicked.service';

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
  router: Router;
  eventClickS: EventclickedService;
  constructor(eventService: EventService, authS: AuthService, router: Router, eventClickS: EventclickedService) {
    this.eventService = eventService;
    this.authS = authS;
    this.uid = '';
    this.router = router;
    this.eventClickS = eventClickS;
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

  eventDetail(event: Event) {
    console.log(event);
    this.eventClickS.setEventClicked(event);
    this.router.navigateByUrl('detail');
  }

}
