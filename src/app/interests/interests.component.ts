import { Component, OnInit } from '@angular/core';
import {Preference} from '../Classes/Preference';
import {AuthService} from '../Services/auth.service';
import {ProfileService} from '../Services/profile.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  eventTypes: string[] = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Festival',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk'];
  user: any;
  ps: ProfileService;
  constructor(ps: ProfileService) {
    this.ps = ps;
  }

  ngOnInit() {
    this.ps.getCurrentUser().subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
        console.log(this.user.email);
      }
    });
  }

  addInterests(interests: any) {
    const preferences = new Array();
    for (let i = 0; i < interests.length; i++) {
      const preference = new Preference();
      preference.name = interests[i].value;
      console.log(preference.name);
      preferences.push(preference.name);
    }
    this.ps.updateUserWithUserPreferences(preferences);
  }

}
