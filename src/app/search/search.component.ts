import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EventService} from '../Services/event.service';
import {Event} from '../event-view/event/Event';
import {from} from 'rxjs';
import {ProfileService} from '../Services/profile.service';
import {User} from '../Classes/User';
import {isNullOrUndefined} from 'util';
import {Util} from '../Util';
import {MatDatepicker} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dates = ['Today', 'Tomorrow', 'The weekend', 'Pick a date'];
  events: Event[] = [];
  date = Date.now();
  university = '';
  text = '';
  showPicker = false;
  constructor(private eventService: EventService, private profileService: ProfileService, private router: Router) {
    this.profileService.getUserProfile().subscribe((user: User) => {
      if (!isNullOrUndefined(user) && !isNullOrUndefined(user.university)) {
        this.university = user.university;
      }
    });
    // from(this.eventService.downloadEvents());
    this.eventService.getSearchObservable().subscribe((events) => {
      if (!isNullOrUndefined(events)) {
        this.events = events;
        console.log(events);
      }
    });
  }

  ngOnInit() {
  }
  searchChanged(text: string) {
    console.log(text);
    this.text = '';
    this.eventService.search(text, this.university, this.date);
  }
  dateChipChanged(selected: string) {
    console.log(this.date);
    const dt = new Date();
    console.log(dt.toDateString());
    dt.setMilliseconds(Date.now());
    if (selected === this.dates[0]) {
      this.eventService.search(this.text, this.university, this.date);
    } else if (selected === this.dates[1]) {
      this.eventService.search(this.text, this.university, Util.tomorrowInMillis(this.date));
    } else if (selected === this.dates[2]) {
      this.eventService.search(this.text, this.university, Util.getSaturday(this.date));
    } else {
      this.showPicker = !this.showPicker;
    }
    console.log(selected);
  }
  dateChanged(selected: string) {
    const split = selected.toString().split(' ');
    const dt = `${Util.monthMap[split[1]]} ${split[2]} ${split[3]}`;
    const date = new Date(dt);
    this.showPicker = false;
    this.eventService.search(this.text, this.university, date.getTime());
  }
  getDate(time: number) {
    return Util.getDate(time);
  }
  eventClicked(event: Event) {
    this.router.navigateByUrl(`detail/${event.eventId}`);
  }
}
