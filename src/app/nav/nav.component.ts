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
  signedIn: boolean;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authS = authService;
    this.signedIn = false;
  }

  ngOnInit() {
    this.authS.user.subscribe((user) => {
      console.log(this.user);
      if (this.user !== undefined) {
        this.signedIn = true;
        this.user = user;
        this.uid = user.uid;
        document.getElementById('signOut').style.display = 'block';
        document.getElementById('signIn').style.display = 'none';
        console.log(this.user.email);
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
    document.getElementById('signOut').style.display = 'none';
    document.getElementById('signIn').style.display = 'block';
    this.authS.signOut();
  }

}
