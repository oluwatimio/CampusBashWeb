import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {SigninemitterService} from './signinemitter.service';
import {UserSingle} from './UserSingle';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  router: Router;
  isAnonymous: boolean;
  uid: string;
  user: Observable<any>;
  userS: UserSingle;

  constructor(router: Router) {
    this.router = router;

    this.user = new Observable((observer) => {
      this.observeUser(observer);
    });
  }

  OnInit() {

  }

  signUp(email: string, pass: string) {
    firebase.auth().createUserWithEmailAndPassword(email , pass);
  }

  signIn(email: string, pass: string) {
    console.log(email);
    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
      this.router.navigateByUrl('/');
    }).catch(function(error) {
      console.log(error);
      alert('Wrong user name or password');
    });
  }

  signinAno() {
    return firebase.auth().signInAnonymously();
  }
  observeUser(observer) {
    firebase.auth().onAuthStateChanged((user) => {
      observer.next(user);
    });
  }



}
