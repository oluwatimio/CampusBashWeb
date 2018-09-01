import {Component, NgZone, OnInit} from '@angular/core';
import {Preference} from '../Classes/Preference';
import {AuthService} from '../Services/auth.service';
import {ProfileService} from '../Services/profile.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {EventGroup} from '../Classes/EventGroup';
import {Util} from '../Util';
import {isNullOrUndefined} from 'util';
import {User} from '../Classes/User';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  eventTypes: string[] = ['Frosh', 'House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Festival',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk'];
  user: User;
  studentId: string;
  ps: ProfileService;
  router: Router;
  ng: NgZone;
  groups: EventGroup[] = new Array();
  isFreshMan = false;
  constructor(ps: ProfileService, router: Router, ng: NgZone, public sb: MatSnackBar) {
    this.ps = ps;
    this.ng = ng;
    this.router = router;
  }

  ngOnInit() {
    this.ps.getUserProfile().subscribe((user) => {
      if (!isNullOrUndefined(user)) {
        this.user = user;
        this.studentId = this.user.studentId;
        this.ng.run(() => this.checkGroups());
      }
    });
  }

  addInterests(interests: any, group: any) {
    if (isNullOrUndefined(this.user)) {
      this.sb.open('You need to create an account to select interests', null, {duration: 5000});
      this.ng.run(() => this.router.navigateByUrl('signin'));
      return;
    }
    const len = interests.length;
    if (len < 3) {
      Util.openSnackbar('Please select at least 3 events', this.sb);
      return;
    }
    const preferences = new Array();
    for (let i = 0; i < len; i++) {
      const preference = new Preference();
      preference.name = interests[i].value;
      preferences.push(preference.name);
    }

    // if (group[0].value !== undefined) {
    //   const pref = new Preference()
    //   pref.name = group[0].value;
    //   preferences.push(pref);
    // }
    this.ps.updateUserWithUserPreferences(preferences);
  }

  checkGroups() {
    const db = firebase.firestore();
    db.collection('eventGroup').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const group = new EventGroup(doc.data().eventType, doc.data().idList);
        this.isInFroshList(group);
        this.groups.push(group);
      });
    });
  }
  isInFroshList(group: EventGroup) {
    if (isNullOrUndefined(group)) {
      return;
    }
    for (let i = 0; i < group.idList.length; i++) {
      if (group.idList[i] === this.studentId) {
        this.isFreshMan = true;
        return;
      }
    }
    this.isFreshMan = false;
  }
}
