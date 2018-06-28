import { Component, OnInit } from '@angular/core';
import {MDCTopAppBar} from '@material/top-app-bar/index';
import * as firebase from 'firebase/app'
import {EventService} from '../Services/event.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  hideAddEvent: boolean;
  router: Router;

  constructor(router: Router) {
    this.hideAddEvent = false;
    this.router = router;
  }

  ngOnInit() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      console.log(currentUser);
      this.hideAddEvent = false;
    }
  }

  addEvent() {
    this.router.navigateByUrl('addevent');
  }

}
