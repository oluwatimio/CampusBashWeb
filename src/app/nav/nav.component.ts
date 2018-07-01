import {Component, EventEmitter, OnInit} from '@angular/core';
import {MDCTopAppBar} from '@material/top-app-bar/index';
import * as firebase from 'firebase/app'
import {EventService} from '../Services/event.service';
import {Router} from '@angular/router';
import {SigninemitterService} from '../Services/signinemitter.service';
import {AuthService} from '../Services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  hideAddEvent: boolean;
  router: Router;
  subscription: EventEmitter<any>;
  hideSignIn: boolean;
  authS: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.hideAddEvent = false;
    this.router = router;
    this.hideSignIn = false;
    this.authS = authService;
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        if (user.isAnonymous === false) {
          this.hideSignIn = true;
        }
        console.log(user.email);
      }
    });
  }

  addEvent() {
    this.router.navigateByUrl('addevent');
  }

  signInPage(){
    this.router.navigateByUrl('signin');
  }

}
