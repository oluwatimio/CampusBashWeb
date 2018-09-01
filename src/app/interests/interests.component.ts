import {Component, NgZone, OnInit} from '@angular/core';
import {Preference} from '../Classes/Preference';
import {AuthService} from '../Services/auth.service';
import {ProfileService} from '../Services/profile.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {EventGroup} from '../Classes/EventGroup';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  eventTypes: string[] = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Festival',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk', 'Frosh'];
  user: any;
  studentId: string;
  ps: ProfileService;
  router: Router;
  ng: NgZone;
  groups: EventGroup[] = new Array();
  hideL: boolean;
  constructor(ps: ProfileService, router: Router, ng: NgZone, public sb: MatSnackBar) {
    this.ps = ps;
    this.ng = ng;
    this.router = router;
    this.hideL = false;
  }

  ngOnInit() {
    this.ps.getCurrentUser().subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
        this.getStudentID();
      } else if (user === undefined || user === null) {
        this.sb.open('You need to create an account to select interests', null, {duration: 5000});
        this.ng.run(() => this.router.navigateByUrl('signin'));
      }
    });
  }

  getStudentID() {
    const db = firebase.firestore();

    db.collection('users').where('uid', '==', this.user.uid)
      .get()
      .then((querySnaphot) => {
        querySnaphot.forEach((doc) => {
          this.studentId = doc.data().studentId;
          this.ng.run(() => this.checkGroups());
        });
      }).catch((error) => {

    });
  }

  addInterests(interests: any, group: any) {
    const preferences = new Array();
    for (let i = 0; i < interests.length; i++) {
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
        this.groups.push(group);
      });
      this.hideL = true;
    });
  }

}
