import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {SigninemitterService} from './signinemitter.service';
import {UserSingle} from './UserSingle';

@Injectable()
export class AuthService {
  router: Router;
  emitter: SigninemitterService;
  isAnonymous: boolean;
  uid: string;
  user: any;
  userS: UserSingle;
  constructor(router: Router, emitter: SigninemitterService, userS: UserSingle) {
    this.router = router;
    this.emitter = emitter;
    this.userS = userS;
  }
  OnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        this.user = user;
        this.userS.getInstance().setIsAnonymous(false);
        this.userS.getInstance().setSigned(true);
        this.userS.getInstance().setUid(user.uid);
      }
      this.isAnonymous = user.isAnonymous;
      this.uid = user.uid;
    });
  }

  signUp(email: string, pass: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, pass);
    firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then((usercred) => {
      console.log(usercred.user);
    }, (error) => {
      console.log(error);
    });
  }

  signIn(email: string, pass: string) {
    console.log(email);
    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
      this.emitter.change();
      this.router.navigateByUrl('tabs');
    }).catch(function(error) {
      console.log(error.message);
      alert('Wrong user name or password');
    });
  }

  signinAno() {
    firebase.auth().signInAnonymously().then(() => {
      console.log('Signed in anonymously');
    }).catch(function(error) {
      console.log(error.message);
    });
  }

}
