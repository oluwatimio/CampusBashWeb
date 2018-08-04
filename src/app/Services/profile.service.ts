import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {Preference} from '../Classes/Preference';

@Injectable()
export class ProfileService {
  constructor() {
  }

  addUser(email: string, uid: string) {
    const db = firebase.firestore();
    db.collection('users').doc(uid).set({email: email, uid: uid}).then(() => {
      console.log('User added to db');
    });
  }

  updateUserWithUserName(username: string, summary: string, uid: string) {
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
