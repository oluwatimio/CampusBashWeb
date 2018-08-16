import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {Preference} from '../Classes/Preference';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ProfileService {
  router: Router;
  constructor(router: Router, public snackbar: MatSnackBar) {
    this.router = router;
  }

  updateUserWithUserName(username: string, summary: string, uid: string) {
    const db = firebase.firestore();
    db.collection('users').doc(uid).update({
      username: username,
      summary: summary
    }).then(() => {
      console.log('Username Updated');
      this.router.navigateByUrl('interests');
    });
  }

  updateUserWithUserPreferences(preferences: any, uid: string) {
    const db = firebase.firestore();
    db.collection('users').doc(uid).update({
      preference: preferences,
    }).then(() => {
      this.snackbar.open('Interests Added', null, {
        duration: 5000
      });
      this.router.navigateByUrl('university');
    });
  }

  updateUserWithUni(uni: any, uid: string) {
    const db = firebase.firestore();
    db.collection('users').doc(uid).update({
      university: uni,
    }).then(() => {
      this.snackbar.open('University Set', null, {
        duration: 5000
      });
      this.router.navigateByUrl('/');
    });
  }

  updateUserWithUserP(username: string, summary: string, uid: string) {
    const db = firebase.firestore();
    db.collection('users').doc(uid).update({
      username: username,
      summary: summary
    }).then(() => {
      console.log('Username Updated');
    });
  }

  updateOnboarding(country: string, university: string, preference: Preference[], uid: string) {
    const db = firebase.firestore();

    db.collection('users').doc(uid).update({
      country: country,
      university: university,
      preference: preference
    }).then(() => {
      console.log('Onboarding updated');
    });
  }

  updateFCMT(fcmt: string, uid: string) {
    const db = firebase.firestore();

    db.collection('users').doc(uid).update({
      fcmToken: fcmt,
    }).then(() => {
      console.log('fcmt updated');
    });
  }

  updateStripe(stripeid: string, uid: string) {
    const db = firebase.firestore();

    db.collection('users').doc(uid).update({
      stripeCustomerId: stripeid,
    }).then(() => {
      console.log('sid updated');
    });
  }
}
