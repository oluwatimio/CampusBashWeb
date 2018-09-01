import { Component, OnInit } from '@angular/core';
import {MDCTextField} from '@material/textfield';
import {ProfileService} from '../Services/profile.service';
import {AuthService} from '../Services/auth.service';
import {MatSnackBar} from '@angular/material';
import {CloudFunctionsService} from '../Services/cloud-functions.service';
import {isNullOrUndefined} from 'util';
import {Util} from '../Util';

const mdcDialog = require('@material/dialog');
const MDCDialog = mdcDialog.MDCDialog;

declare var require: any;
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
  constructor(ps: ProfileService, private functionsService: CloudFunctionsService, public sb: MatSnackBar) {
    this.username = '';
    this.summary = '';
    this.studentNum = '';
    this.ps = ps;
  }

  ngOnInit() {
    this.ps.getCurrentUser().subscribe((user) => {
      if (this.user !== null) {
        this.uid = user.uid;
        document.getElementById('signOut').style.display = 'block';
        document.getElementById('signIn').style.display = 'none';
      }
    });
    const username = new MDCTextField(document.querySelector('.username'));
    const summary = new MDCTextField(document.querySelector('.summary'));
    const studentNum1 = new MDCTextField(document.querySelector('.studentNum'));
  }
  async update() {
    const dialog = new MDCDialog(document.querySelector('#please_wait'));
    if (!isNullOrUndefined(this.studentNum) && this.studentNum.trim().length > 0) {
      dialog.show();
      const isNew: boolean = await this.functionsService.isNewStudentId(this.studentNum);
      if (isNullOrUndefined(isNew)) {
        dialog.close();
        Util.openSnackbar('oops, could not verify your student id', this.sb);
        return;
      } else if (isNew) {
        dialog.close();
      } else {
        dialog.close();
        Util.openSnackbar('This student id has been used', this.sb);
        return;
      }
    }
    const sampleUserN = this.username.replace(/\s/g, '');
    if (sampleUserN !== '') {
      this.ps.updateUserWithUserName(this.username, this.summary, this.studentNum);
    } else {
      this.sb.open('Please enter a username', null, {duration: 5000});
    }
  }

}
