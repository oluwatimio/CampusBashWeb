import { Component, OnInit } from '@angular/core';
import {EventService} from '../Services/event.service';
import {EventSection} from '../event-view/event/EventSection';
import * as firebase from 'firebase/app';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent implements OnInit {
  eventService: EventService;
  event: Event[];
  authS: AuthService;
  user: any;
  uid: string;
  constructor(eventService: EventService, authS: AuthService) {
    this.eventService = eventService;
    this.authS = authS;
  }

  ngOnInit() {
    //
    // this.authS.user.subscribe((user) => {
    //   this.user = user;
    //   this.uid = user.uid;
    //   this.getHosted();
    // });

  }
  getHosted() {
    this.eventService.getEvents().then((events) => {

      for (let i = 0; i < events.length; i++) {
        if (events[i].events.length !== 0) {
          for (let g = 0; g < events[i].events.length; g++ ) {
            if (events[i].events[g].creator.uid === this.user.uid) {
              console.log(events[i].events[g]);
            }
          }
        }
      }
    });
  }

}
