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
  router: Router;
  subscription: EventEmitter<any>;
  authS: AuthService;
  uid: string;
  user: any;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authS = authService;
  }

  ngOnInit() {
    this.authS.user.subscribe((user) => {
      if (this.user !== null) {
        this.user = user;
        this.uid = user.uid;
        console.log(this.user.email);
        document.getElementById('showSignIn').style.visibility = 'hidden';
        document.getElementById('showSignIn').style.display = 'none';
      }
    });
  }

  addEvent() {
    this.router.navigateByUrl('addevent');
  }

  signInPage() {
    this.router.navigateByUrl('signin');
  }

  signOut() {
    this.authS.signOut();
  }

}
