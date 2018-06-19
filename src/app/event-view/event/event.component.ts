import { Component, OnInit } from '@angular/core';
import {EventSection} from './EventSection';
import {EventService} from '../../Services/event.service';
import {Event} from './Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  sections: EventSection[]; // This holds event sections which all contain arrays of events
  events: EventSection[];
  eventService: EventService;
  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  ngOnInit() {
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
