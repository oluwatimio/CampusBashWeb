import { Component, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  router: Router;
  ui = true;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(){
  }
}
