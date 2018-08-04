import { Component, OnInit } from '@angular/core';
import {MDCTextField} from '@material/textfield';

@Component({
  selector: 'app-profilecreator',
  templateUrl: './profilecreator.component.html',
  styleUrls: ['./profilecreator.component.css']
})
export class ProfilecreatorComponent implements OnInit {
  username: string;
  summary: string;
  constructor() {
    this.username = '';
    this.summary = '';
  }

  ngOnInit() {
    const username = new MDCTextField(document.querySelector('.username'));
    const summary = new MDCTextField(document.querySelector('.summary'));
  }

}
