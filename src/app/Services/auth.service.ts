import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }

  OnInit() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.email);
      }
    });
  }

  signUp(email: string, pass: string) {
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
      console.log(error.message);
    });
  }

  signIn(email: string, pass: string) {
    console.log(email);
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
      console.log(error.message);
    }).then(() => {
      this.router.navigateByUrl('tabs');
    });
  }

}
