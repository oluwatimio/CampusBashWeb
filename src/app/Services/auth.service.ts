import {Injectable, NgZone, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {SigninemitterService} from './signinemitter.service';
import {UserSingle} from './UserSingle';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay} from 'q';
import {ProfileService} from './profile.service';
import {isNullOrUndefined} from 'util';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AuthService {
  router: Router;
  isAnonymous: boolean;
  uid: string;
  private currentUser = new BehaviorSubject(null);
  user = this.currentUser.asObservable();
  ng: NgZone;
  constructor(router: Router, ng: NgZone, public sb: MatSnackBar) {
    this.router = router;
    this.observeUser();
    this.ng = ng;
  }

  OnInit() {

  }

  signUp(email: string, pass: string) {
    firebase.auth().createUserWithEmailAndPassword(email , pass).then((response) => {
      this.router.navigateByUrl('profilec');
    }).catch((error) => {
      this.sb.open(error.message, null, {duration: 5000});
    });
  }

  signIn(email: string, pass: string) {
    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
      this.router.navigateByUrl('/');
    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        this.signUp(email, pass);
      } else if (error.code === 'auth/wrong-password') {
        this.sb.open('Wrong user name or password', null, {duration: 5000});
      }
    });
  }

  signinAno() {
    return firebase.auth().signInAnonymously();
  }
  observeUser() {
    firebase.auth().onAuthStateChanged((user) => {
      try {
        this.uid = user.uid;
        this.currentUser.next(user);
      } catch (e) {
      }
    });
  }

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // const token = result.credential.accessToken;
      const db = firebase.firestore();
      db.collection('users').doc(result.user.uid).get().then((doc) => {
        if (doc.exists) {
          if (doc.data().university === undefined) {
            this.ng.run(() => this.router.navigateByUrl('profilec'));
          } else {
            this.ng.run(() => this.router.navigateByUrl('/'));
          }
        }
      });
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });

  }

  facebookSignIn() {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then((result) => {

      const db = firebase.firestore();
      db.collection('users').doc(result.user.uid).get().then((doc) => {
        if (doc.exists) {
          if (doc.data().university === undefined) {
            this.ng.run(() => this.router.navigateByUrl('profilec'));
          } else {
            this.ng.run(() => this.router.navigateByUrl('/'));
          }
        }
      })
      const user = result.user;
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
  }
  getUid() {
    const user: firebase.User = firebase.auth().currentUser;
    if (isNullOrUndefined(user)) { return ''; }
    return firebase.auth().currentUser.uid;
  }

  async getIdToken() {
    const user: firebase.User = firebase.auth().currentUser;
    if (isNullOrUndefined(user)) { return ''; }
    return firebase.auth().currentUser.getIdToken();
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.ng.run(() => this.router.navigateByUrl('signin'));
    }).catch(function(error) {
      // An error happened.
    });
  }

}
