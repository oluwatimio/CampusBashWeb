import { Component, OnInit, Input } from '@angular/core';
import {Event} from '../event-view/event/Event';
import {EventclickedService} from '../Services/eventclicked.service';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  clicks: EventclickedService;
  eventClicked: Event;
  constructor(clicks: EventclickedService) {
    this.clicks = clicks;
   }

  ngOnInit() {
    this.clicks.localStorages.getItem<Event>('event').subscribe((event) => {
      this.eventClicked = event;
      console.log(this.eventClicked.description);
    });
    //this.eventClicked = event;
  }

  getDate(dateM: number) {
    const date = new Date(dateM);
    const dateArray = date.toString().split(' ');
    // dateArray[1] + ' ' + dateArray[2];
    const date2 = dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2];
    return date2;
  }

}
