import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
declare var require: any;
@Component({
  selector: 'app-mapp',
  templateUrl: './mapp.component.html',
  styleUrls: ['./mapp.component.css']
})
export class MappComponent implements OnInit {
  router: Router
  constructor(router: Router, public sb: MatSnackBar) {
    this.router = router;
  }

  ngOnInit() {
  }

  openSnack() {
    // this.sb.open('Install Campus Bash on your iOS device by clicking on the share button and adding CampusBash.ca to your homescreen',
    //   null, {duration: 10000});
    // this.router.navigateByUrl('/');

    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    const dialog = new MDCDialog(document.querySelector('#my-mdc-dialog'));

    dialog.show();
  }

}
