import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  signUp(email: string, pass: string) {
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
      console.log(error.message);
    });
  }

  signIn(email: string, pass: string) {
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
      console.log(error.message);
    });
  }

}
