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
import * as firebase from 'firebase';
import {Preference} from '../Classes/Preference';

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
  user: User;
  preferences = {};
  idList = {};
  db = firebase.firestore();
  constructor(private eventService: EventService, private profileService: ProfileService, private router: Router) {
    this.profileService.getUserProfile().subscribe((user: User) => {
      this.user = user;
      if (!isNullOrUndefined(user)) {
        this.downloadIdList();
        this.downloadInterests();
      }
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
  shouldShow(event: Event): boolean {
    if (event.eventType !== 'Frosh') {
      return true;
    }
    if (isNullOrUndefined(this.user)) {
      return false;
    } else if (this.idList.hasOwnProperty(this.user.uid) || this.preferences.hasOwnProperty('Frosh')) {
      return true;
    }
    return false;
  }
  downloadInterests() {
    this.db.collection('users').doc(this.user.uid)
      .onSnapshot(snap => {
        if (!snap.exists) {
          return;
        }
        const user = snap.data() as User;
        console.log(user);
        user.preference.forEach(val => {
          this.preferences[String(val)] = true;
        });
        console.log(this.preferences);
      });
  }
  downloadIdList() {
    this.db.collection('eventGroup').doc('ess')
      .onSnapshot(snap => {
        if (!snap.exists) {
          return;
        }
        const list: string[] = snap.data().idList;
        list.forEach(val => {
          this.idList[val] = true;
        });
        console.log(this.idList);
      });
  }
}
