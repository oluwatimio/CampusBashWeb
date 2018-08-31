import { Component, OnInit } from '@angular/core';
import {MDCSelect} from '@material/select';
import {AuthService} from '../Services/auth.service';

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

  constructor(authS: AuthService) {
    this.authS = authS;
    this.userExists = false;
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
      alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    });
  }
  filterUni() {
  }
}
