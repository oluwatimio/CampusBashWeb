import {Injectable, NgZone} from '@angular/core';
import * as firebase from 'firebase/app';
import {Preference} from '../Classes/Preference';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../Classes/User';
import {AuthService} from './auth.service';
import {isNullOrUndefined} from 'util';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable()
export class ProfileService {
  router: Router;
  private user = new BehaviorSubject(null);
  private uid: string = null;
  private db = firebase.firestore();
  ng: NgZone;
  constructor(router: Router, public snackbar: MatSnackBar, private auth: AuthService, ng: NgZone) {
    this.router = router;
    this.auth.user.subscribe((currentUser) => {
      if (!isNullOrUndefined(currentUser)) {
        const uid = currentUser.uid;
        this.uid = uid;
        this.observeUser();
      }
    });
    this.ng = ng;
  }

  private observeUser() {
    this.db.collection('users').doc(this.uid)
      .onSnapshot((doc: DocumentSnapshot) => {
        if (doc.exists) {
          this.user.next(<User> doc.data());
        }
      });
  }
  getUserProfile(): Observable<any> {
    return this.user.asObservable();
  }
  getCurrentUser(): Observable<any> {
    return this.auth.user;
  }

  updateUserWithUserName(username: string, summary: string, studentNum: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();
    db.collection('users').doc(this.uid).update({
      userName: username,
      summary: summary,
      studentId: studentNum
    }).then(() => {
      this.router.navigateByUrl('interests');
    });
  }

  updateUserWithUserPreferences(preferences: any) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();
    db.collection('users').doc(this.uid).update({
      preference: preferences,
    }).then(() => {
      this.snackbar.open('Interests Added', null, {
        duration: 5000
      });
      this.router.navigateByUrl('university');
    });
  }

  updateUserWithUni(uni: any) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();
    db.collection('users').doc(this.uid).update({
      university: uni,
    }).then(() => {
      this.snackbar.open('University Set', null, {
        duration: 5000
      });
      this.ng.run(() => this.router.navigateByUrl('/'));
    });
  }

  updateUserWithUserP(username: string, summary: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();
    db.collection('users').doc(this.uid).update({
      userName: username,
      summary: summary
    }).then(() => {
    });
  }

  updateOnboarding(country: string, university: string, preference: Preference[]) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();

    db.collection('users').doc(this.uid).update({
      country: country,
      university: university,
      preference: preference
    }).then(() => {
    });
  }

  updateFCMT(fcmt: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();

    db.collection('users').doc(this.uid).update({
      fcmToken: fcmt,
    }).then(() => {
    });
  }

  updateStripe(stripeid: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();

    db.collection('users').doc(this.uid).update({
      stripeCustomerId: stripeid,
    }).then(() => {
    });
  }
}
