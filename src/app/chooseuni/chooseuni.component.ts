import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {ProfileService} from '../Services/profile.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-chooseuni',
  templateUrl: './chooseuni.component.html',
  styleUrls: ['./chooseuni.component.css']
})
export class ChooseuniComponent implements OnInit {

  universities: string[] = ['University of Ottawa', 'Carelton University'];

  authS: AuthService;
  user: any;
  ps: ProfileService;

  constructor(authS: AuthService, ps: ProfileService, public snackbar: MatSnackBar) {
    this.authS = authS;
    this.ps = ps;
  }

  ngOnInit() {
    this.authS.user.subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
        console.log(this.user.email);
      }
    });
  }

  addUni(val: any) {
    if (val.length === 1) {
      this.ps.updateUserWithUni(val[0].value);
    } else {
      this.snackbar.open('You can only select one University', null, {
        duration: 5000
      });
    }
  }

}
