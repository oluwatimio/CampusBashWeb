import { Component, OnInit } from '@angular/core';
import {MDCTextField} from '@material/textfield';
import {ProfileService} from '../Services/profile.service';
import {AuthService} from '../Services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profilecreator',
  templateUrl: './profilecreator.component.html',
  styleUrls: ['./profilecreator.component.css']
})
export class ProfilecreatorComponent implements OnInit {
  username: string;
  summary: string;
  ps: ProfileService;
  uid: string;
  user: any;
  studentNum: string;
  constructor(ps: ProfileService, public sb: MatSnackBar) {
    this.username = '';
    this.summary = '';
    this.studentNum = '';
    this.ps = ps;
  }

  ngOnInit() {
    this.ps.getCurrentUser().subscribe((user) => {
      console.log(this.user);
      if (this.user !== null) {
        this.uid = user.uid;
        document.getElementById('signOut').style.display = 'block';
        document.getElementById('signIn').style.display = 'none';
        console.log(this.user.email);
      }
    });
    const username = new MDCTextField(document.querySelector('.username'));
    const summary = new MDCTextField(document.querySelector('.summary'));
    const studentNum1 = new MDCTextField(document.querySelector('.studentNum'));
  }
  update() {
    const sampleUserN = this.username.replace(/\s/g, '');
    if (sampleUserN !== '') {
      this.ps.updateUserWithUserName(this.username, this.summary, this.studentNum);
    } else {
      this.sb.open('Please enter a username', null, {duration: 5000});
    }
  }

}
