import { Component, OnInit } from '@angular/core';
import {EventService} from '../Services/event.service';
import {EventSection} from '../event-view/event/EventSection';
import * as firebase from 'firebase/app';
import {AuthService} from '../Services/auth.service';
import {Event} from '../event-view/event/Event';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {
  eventService: EventService;
  events: Event[] = new Array();
  authS: AuthService;
  user: any;
  uid: string;
  constructor(eventService: EventService, authS: AuthService) {
    this.eventService = eventService;
    this.authS = authS;
  }

  ngOnInit() {
    this.authS.user.subscribe((user) => {
      if (!isNullOrUndefined(user)) {
        this.user = user;
        this.uid = user.uid;
        this.getHosted();
      }
    });

  }

  getHosted() {
    this.eventService.getEventsHosting(this.uid).subscribe((events: Event[]) => {
      this.events.length = 0;
      events.forEach(event => this.events.push(event));
    });
  }

  getDate(dateM: number) {
    const date = new Date(dateM);
    const dateArray = date.toString().split(' ');
    // dateArray[1] + ' ' + dateArray[2];
    return dateArray;
  }

}
