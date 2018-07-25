import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {SigninemitterService} from './signinemitter.service';
import {UserSingle} from './UserSingle';
;

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
    firebase.auth().createUserWithEmailAndPassword(email , pass).then(() => {
      // this.router.navigateByUrl('/');
    }).catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
  }

  signIn(email: string, pass: string) {
    console.log(email);
    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
      //this.router.navigateByUrl('/');
    }).catch((error) => {
      console.log(error.code);
      if (error.code === 'auth/user-not-found') {
        this.signUp(email, pass);
      }
    });
  }

  signinAno() {
    return firebase.auth().signInAnonymously();
  }
  observeUser(observer) {
    firebase.auth().onAuthStateChanged((user) => {
      observer.next(user);
      if (user) {
        this.router.navigateByUrl('tabs');
      }
    });
  }

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // const token = result.credential.accessToken;
      const user = result.user;
      console.log(user);
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
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user;
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });

    // firebase.auth().getRedirectResult().then(function(result) {
    //   if (result.credential) {
    //   }
    //   // The signed-in user info.
    //   const user = result.user;
    //   this.router.navigateByUrl('/');
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   const credential = error.credential;
    //   // ...
    // });
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }



}
