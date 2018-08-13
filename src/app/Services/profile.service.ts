import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {Preference} from '../Classes/Preference';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../Classes/User';
import {AuthService} from './auth.service';
import {isNullOrUndefined} from 'util';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable()
export class ProfileService {
  router: Router;
  private user = new BehaviorSubject(null);
  private uid = '';
  private db = firebase.firestore();
  constructor(router: Router, private auth: AuthService) {
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
  getUser(): Observable<any> {
    return this.user.asObservable();
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
      this.router.navigateByUrl('');
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
