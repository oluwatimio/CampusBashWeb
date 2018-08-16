import { Injectable } from '@angular/core';
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
  constructor(router: Router, public snackbar: MatSnackBar, private auth: AuthService) {
    this.router = router;
    this.auth.user.subscribe((currentUser) => {
      const uid = currentUser.uid as string;
      if (!isNullOrUndefined(uid)) {
        this.uid = uid;
        this.observeUser();
      }
    });
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

  updateUserWithUserName(username: string, summary: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();
    db.collection('users').doc(this.uid).update({
      userName: username,
      summary: summary
    }).then(() => {
      console.log('Username Updated');
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
      this.router.navigateByUrl('/');
    });
  }

  updateUserWithUserP(username: string, summary: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();
    db.collection('users').doc(this.uid).update({
      username: username,
      summary: summary
    }).then(() => {
      console.log('Username Updated');
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
      console.log('Onboarding updated');
    });
  }

  updateFCMT(fcmt: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();

    db.collection('users').doc(this.uid).update({
      fcmToken: fcmt,
    }).then(() => {
      console.log('fcmt updated');
    });
  }

  updateStripe(stripeid: string) {
    if (isNullOrUndefined(this.uid)) { return; }
    const db = firebase.firestore();

    db.collection('users').doc(this.uid).update({
      stripeCustomerId: stripeid,
    }).then(() => {
      console.log('sid updated');
    });
  }
}
