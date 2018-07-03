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
  uid: string;
  user: any;

  constructor(router: Router, authService: AuthService) {
    this.hideAddEvent = false;
    this.router = router;
    this.authS = authService;
    this.hideSignIn = false;
  }

  ngOnInit() {

    this.authS.user.subscribe((user) => {
      if (this.user !== undefined || this.user !== null) {
        console.log('User signed in');
        this.user = user;
        console.log(user);
        this.uid = user.uid;
        console.log(this.user.email);
        this.hideSignIn = true;
        console.log(this.hideSignIn);
      }
    });
  }

  addEvent() {
    this.router.navigateByUrl('addevent');
  }

  signInPage() {
    this.router.navigateByUrl('signin');
  }

}
