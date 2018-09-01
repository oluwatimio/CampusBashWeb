import { Component, OnInit } from '@angular/core';
import {MDCSelect} from '@material/select';
import {AuthService} from '../Services/auth.service';
import {EventfilteringService} from '../eventfiltering.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  universities: string[] = ['University of Ottawa', 'Carelton University'];
  authS: AuthService;
  user: any;
  uid: string;
  userExists: boolean;
  efs: EventfilteringService;

  constructor(authS: AuthService, efs: EventfilteringService) {
    this.authS = authS;
    this.userExists = false;
    this.efs = efs;
  }

  ngOnInit() {
    this.authS.user.subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
        this.uid = user.uid;
        this.userExists = true;
      }
    });
    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('change', () => {
      this.efs.selectUni(select.value);
    });
  }
  filterUni() {
  }
}
