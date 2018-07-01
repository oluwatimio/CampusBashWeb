import {Component, EventEmitter, OnInit} from '@angular/core';
import {MDCTopAppBar} from '@material/top-app-bar/index';
import * as firebase from 'firebase/app'
import {EventService} from '../Services/event.service';
import {Router} from '@angular/router';
import {SigninemitterService} from '../Services/signinemitter.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  hideAddEvent: boolean;
  router: Router;
  semmiter: SigninemitterService;
  subscription: EventEmitter<any>;

  constructor(router: Router, semmiter: SigninemitterService) {
    this.hideAddEvent = false;
    this.router = router;
    this.semmiter = semmiter;
  }

  ngOnInit() {
    this.subscription = this.semmiter.getEmittedValue().subscribe(item => this.hideAddEvent = item);
  }

  addEvent() {
    this.router.navigateByUrl('addevent');
  }

}
