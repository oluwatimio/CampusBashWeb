import { Component, OnInit } from '@angular/core';
import {MDCTextField} from '@material/textfield';
import {ProfileService} from '../Services/profile.service';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-profilecreator',
  templateUrl: './profilecreator.component.html',
  styleUrls: ['./profilecreator.component.css']
})
export class ProfilecreatorComponent implements OnInit {
  username: string;
  summary: string;
  ps: ProfileService;
  authS: AuthService;
  uid: string;
  user: any;
  constructor(ps: ProfileService, as: AuthService) {
    this.username = '';
    this.summary = '';
    this.ps = ps;
    this.authS = as;
  }

  ngOnInit() {
    this.authS.user.subscribe((user) => {
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
  }
  update() {
    this.ps.updateUserWithUserName(this.username, this.summary);
  }

}
