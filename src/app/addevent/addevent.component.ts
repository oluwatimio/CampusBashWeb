import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';
import {text} from '../../../node_modules/@angular/core/src/render3/instructions';
import {Tickets} from '../Classes/Tickets';
import {} from '@types/googlemaps';
import {tick} from '@angular/core/testing';
import {Creator} from '../Classes/Creator';
import {ProfileService} from '../Services/profile.service';
import {Event} from '../event-view/event/Event';
import {User} from '../Classes/User';
import {EventService} from '../Services/event.service';

declare var require: any;
@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  // @Input() checked = false;
  prices: string[] = ['FREE', 'PAID'];
  eventTypes: string[] = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Festival',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk'];
  ticketPrice: string;
  eventName: string;
  eventDescription: string;
  eventAddress: string;
  ticketFree: boolean;
  checkedPaid: boolean;
  checkedFree: boolean;
  ticketN: string;
  ticketDes: string;
  ticketQuant: string;
  eventTypeSelected: string;
  ticketName: MDCTextField;
  ticketDescription: MDCTextField;
  ticketQuantity: MDCTextField;
  ticketType: string;
  ticketPaidPrice: MDCTextField;
  tickets: Tickets[] = new Array();
  ps: ProfileService;
  user: any;
  userProfile: User;
  autocomplete: any;
  eventS: EventService;
  constructor(ps: ProfileService, eventS: EventService) {
    this.ticketPrice = '';
    this.ticketFree = true;
    this.checkedPaid = false;
    this.checkedFree = false;
    this.ticketN = '';
    this.ticketDes = '';
    this.ticketQuant = '';
    this.eventTypeSelected = '';
    this.ps = ps;
    this.eventS = eventS;
    this.eventName = '';
    this.eventDescription = '';
    this.eventAddress = '';

  }

  ngOnInit() {

    this.ps.getCurrentUser().subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
        console.log(this.user.email);
      }
    });

    this.ps.getUserProfile().subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.userProfile = user;
      }
    });
    const textField = new MDCTextField(document.querySelector('.name'));
    const textField2 = new MDCTextField(document.querySelector('.description'));

    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('change', () => {
      this.eventTypeSelected = select.value;
      console.log(this.eventTypeSelected);
      console.log(textField.value);
    });

    const textField3 = new MDCTextField(document.querySelector('.where'));


    this.ticketName = new MDCTextField(document.querySelector('.ticketname'));

    this.ticketDescription = new MDCTextField(document.querySelector('.ticketdescription'));
    this.ticketQuantity = new MDCTextField(document.querySelector('.ticketquantity'));
    this.ticketPaidPrice = new MDCTextField(document.querySelector('.ticketpaidp'));

    const input = <HTMLInputElement> document.getElementById('searchbox');
    this.autocomplete = new google.maps.places.Autocomplete(input);
  }
  eordFeeField() {
    if (this.ticketPrice === 'PAID') {
      this.ticketFree = false;
      this.ticketType = 'FREE';
    } else {
      this.ticketFree = true;
      this.ticketType = 'PAID';
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

  checkVal() {}

  addTicket() {

    if (this.checkedPaid === false) {
      this.ticketType = 'Paid';
    } else {
      this.ticketType = 'Free';
    }
    if (this.ticketPaidPrice.value !== '' && this.ticketPaidPrice.value !== undefined) {
      const ticket = new Tickets('CA$', this.ticketDescription.value, 10, 1,
        this.ticketName.value, parseFloat(this.ticketPaidPrice.value), parseInt(this.ticketQuantity.value, 10), null,
        0, null, this.ticketType, true );
      this.tickets.push(ticket);
      console.log(ticket);
    } else {
      const ticket = new Tickets('CA$', this.ticketDescription.value, 10, 1,
        this.ticketName.value, 0, parseInt(this.ticketQuantity.value, 10), null, 0, null,
        this.ticketType, true );
      this.tickets.push(ticket);
      console.log(ticket);
    }
    this.checkedPaid = undefined;
    this.checkedFree = undefined;
    this.ticketPaidPrice.value = undefined;

  }

  uploadEvent() {
    if (this.userProfile !== undefined && this.user !== undefined) {
      const creator = new Creator(this.user.uid, this.userProfile.userName, this.userProfile.stripeAccountId, '');
      const cr = JSON.parse( JSON.stringify(creator));
      const ticks = this.tickets.map((obj) => {
        return Object.assign({}, obj);
      });
      console.log(this.autocomplete.getPlace());
      const event = new Event('', cr, this.eventDescription, 0, '', this.eventName, this.eventTypeSelected,
        '', this.autocomplete.getPlace()['place_id'], null, 0, ticks, '',
        this.userProfile.university);
      this.eventS.addEvent(event);
    }

    else {
      console.log(undefined);
    }
  }

  onSelected() {

    if (this.checkedPaid === true && this.checkedFree !== true) {
      document.getElementById('ticketPaidPrice').style.visibility = 'visible';
    } else if (this.checkedPaid === false && this.checkedFree === true) {
      document.getElementById('ticketPaidPrice').style.visibility = 'hidden';
    } else  if (this.checkedPaid === false && this.checkedFree === false) {
      document.getElementById('ticketPaidPrice').style.visibility = 'hidden';
    }
  }


}
