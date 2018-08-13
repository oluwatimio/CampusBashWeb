import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';
import {text} from '../../../node_modules/@angular/core/src/render3/instructions';

declare var require: any;
@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  @Input() checked: boolean;
  prices: string[] = ['FREE', 'PAID'];
  eventTypes: string[] = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Festival',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk'];
  ticketPrice: string;
  ticketFree: boolean;
  checkedPaid: boolean;
  checkedFree: boolean;
  ticketN: string;
  ticketDes: string;
  ticketQuant: string;
  eventTypeSelected: string;
  constructor() {
    this.ticketPrice = '';
    this.ticketFree = true;
    this.checkedPaid = false;
    this.checkedFree = false;
    this.ticketN = '';
    this.ticketDes = '';
    this.ticketQuant = '';
    this.eventTypeSelected = '';

  }

  ngOnInit() {
    const textField = new MDCTextField(document.querySelector('.name'));
    const textField2 = new MDCTextField(document.querySelector('.description'));

    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('change', () => {
      this.eventTypeSelected = select.value;
      console.log(this.eventTypeSelected);
      console.log(textField.value);
    });

    const textField3 = new MDCTextField(document.querySelector('.where'));


    const ticketName = new MDCTextField(document.querySelector('.ticketname'));

    const ticketDescription = new MDCTextField(document.querySelector('.ticketdescription'));
    const ticketQuantity = new MDCTextField(document.querySelector('.ticketquantity'));
  }
  eordFeeField() {
    if (this.ticketPrice === 'PAID') {
      this.ticketFree = false;
    } else {
      this.ticketFree = true;
    }
  }

  openTicketDialog() {
    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    const dialog = new MDCDialog(document.querySelector('#my-mdc-dialog'));

    dialog.show();
  }

  checkVal(){}
}
