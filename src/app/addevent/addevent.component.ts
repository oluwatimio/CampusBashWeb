import {Component, NgZone, OnInit} from '@angular/core';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';
import {Tickets} from '../Classes/Tickets';
import {Creator} from '../Classes/Creator';
import {ProfileService} from '../Services/profile.service';
import {Event} from '../event-view/event/Event';
import {User} from '../Classes/User';
import {EventService} from '../Services/event.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {StripeAccountState, StripeService} from '../Services/stripe.service';
import {isNullOrUndefined} from 'util';
import {Util} from '../Util';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';

const mdcDialog = require('@material/dialog');
const MDCDialog = mdcDialog.MDCDialog;

declare var require: any;
@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  // @Input() checked = false;
  info_message = 'In order to receive payments on CampusBash, we need to create an account for you on Stripe - our 3rd party\n' +
    '          payments provider. Stripe will help you monitor the income from all your CampusBash ticket purchases. They\n' +
    '          will also make payouts to your bank account 7 days after any amount is spent on your CampusBash tickets. You\n' +
    '          can find out more <a href="https://stripe.com/" target="_blank">here</a>.';
  exists_message = 'Seems like you already have a Stripe account. Would you like to connect it to CampusBash?';
  ticketTypes: string[] = ['FREE', 'PAID'];
  eventTypes: string[] = ['House Party', 'Pool Party', 'Kegger', 'Sports Party', 'Conference', 'Festival',
    'Concert or Performance', 'Tournament', 'Networking', 'Seminar or Talk'];
  date = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
  startTimeNumber: number;
  endTimeNumber: number;
  eventTypeSelected: string;
  ticketName: MDCTextField;
  ticketDescription: MDCTextField;
  ticketQuantity: MDCTextField;
  ticketType: string;
  ticketPaidPrice: MDCTextField;
  tickets: Tickets[] = new Array();
  user: any;
  userProfile: User;
  startTime: string;
  endTime: string;
  autocomplete: any;
  lastDialog = null;
  dialogState = 1;
  stripeSubscription: Subscription;
  constructor(private ps: ProfileService, private eventS: EventService, private router: Router, private stripeService: StripeService,
              public sb: MatSnackBar) {
    this.ticketPrice = '';
    this.ticketFree = true;
    this.checkedPaid = false;
    this.checkedFree = false;
    this.ticketN = '';
    this.ticketDes = '';
    this.ticketQuant = '';
    this.eventTypeSelected = '';
    this.eventName = '';
    this.eventDescription = '';
    this.eventAddress = '';
    this.router = router;
  }

  ngOnInit() {
    this.ps.getCurrentUser().subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
        console.log(this.user.email);
      } else if (user === undefined) {
        this.router.navigateByUrl('signin');
        this.sb.open('You must be signed in to post events', null, {duration: 5000});
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
    this.lastDialog = new MDCDialog(document.querySelector('#my-mdc-dialog'));
    this.lastDialog.show();
  }
  openStripeQueryDialog() {
    if (!isNullOrUndefined(this.lastDialog)) {
      this.lastDialog.close();
    }

    this.lastDialog = new MDCDialog(document.querySelector('#create-stripe-dialog'));
    this.lastDialog.show();
  }

  checkVal() {}

  addTicket() {

    if (this.checkedPaid === true) {
      this.ticketType = 'paid';
    } else {
      this.ticketType = 'free';
    }
    console.log(this.userProfile);
    console.log(this.checkedPaid);
    if (!isNullOrUndefined(this.userProfile) && this.checkedPaid === true &&
      (isNullOrUndefined(this.userProfile.stripeAccountId) || this.userProfile.stripeAccountId.trim().length === 0)) {
      console.log(true);
      this.openStripeQueryDialog();
      return;
    }
    if (this.ticketPaidPrice.value !== '' && this.ticketPaidPrice.value !== undefined) {
      const ticket = new Tickets('CA$', this.ticketDescription.value, 10, 1,
        this.ticketName.value, parseFloat(this.ticketPaidPrice.value), parseInt(this.ticketQuantity.value, 10), 0,
        0, 0, '', this.ticketType, true);
      this.tickets.push(ticket);
      console.log(ticket);
    } else {
      const ticket = new Tickets('CA$', this.ticketDescription.value, 10, 1,
        this.ticketName.value, 0, parseInt(this.ticketQuantity.value, 10), 0, 0, 0,
        '', this.ticketType, true);
      this.tickets.push(ticket);
      console.log(ticket);
    }
    this.checkedPaid = undefined;
    this.checkedFree = undefined;
    this.ticketPaidPrice.value = undefined;

  }

  uploadEvent() {
    if (this.userProfile !== undefined && this.user !== undefined) {
      this.startDateToLong();
      this.endDateToLong();
      const creator = new Creator(this.user.uid, this.userProfile.userName, this.userProfile.stripeAccountId, '');
      const cr = JSON.parse( JSON.stringify(creator));
      const ticks = this.tickets.map((obj) => {
        return Object.assign({}, obj);
      });
      console.log(this.autocomplete.getPlace());
      const event = new Event('', cr, this.eventDescription, this.endTimeNumber, '', this.eventName, this.eventTypeSelected,
        null, this.autocomplete.getPlace()['place_id'], null, this.startTimeNumber, ticks, '',
        this.userProfile.university, 0);
      console.log('post');
      console.log(event);
      this.eventS.addEvent(event);
    } else {
      console.log(undefined);
    }
  }

  onSelected(type: string) {
    if (this.checkedPaid === true && this.checkedFree !== true) {
      document.getElementById('ticketPaidPrice').style.visibility = 'visible';
    } else if (this.checkedPaid === false && this.checkedFree === true) {
      document.getElementById('ticketPaidPrice').style.visibility = 'hidden';
    } else  if (this.checkedPaid === false && this.checkedFree === false) {
      document.getElementById('ticketPaidPrice').style.visibility = 'hidden';
    } else if (type === this.ticketTypes[0]) {
      this.checkedPaid = false;
      document.getElementById('ticketPaidPrice').style.visibility = 'hidden';
    } else {
      this.checkedFree = false;
      document.getElementById('ticketPaidPrice').style.visibility = 'visible';
    }
  }

  startDateToLong() {
    const date = new Date(this.startTime['_a'][0], this.startTime['_a'][1],
      this.startTime['_a'][2], this.startTime['_a'][3], this.startTime['_a'][4]);
    console.log(date);
    this.startTimeNumber = date.getTime();
  }

  endDateToLong() {
    const date = new Date(this.endTime['_a'][0], this.endTime['_a'][1], this.endTime['_a'][2],
      this.endTime['_a'][3], this.endTime['_a'][4]);
    console.log(date);
    this.endTimeNumber = date.getTime();
  }
  showStripeInfoDialog() {
    if (!isNullOrUndefined(this.lastDialog)) {
      this.lastDialog.close();
    }
    this.lastDialog = new MDCDialog(document.querySelector('#stripe_info_dialog'));
    this.lastDialog.show();
  }
  createStripeAccount() {
    if (this.dialogState === 1) {
      this.dialogState = 2;
      this.observeAccount();
    } else if (this.dialogState === 3) {
      window.open(environment.createStripeAccountOauthUrl, '_blank');
      this.lastDialog.close();
      this.openTicketDialog();
    }
  }
  observeAccount() {
    this.stripeService.createdStripeAccount().subscribe((state: StripeAccountState) => {
      if (isNullOrUndefined(state)) {
        console.log(state);
      } else {
        console.log(state);
        this.handleStripeResult(state);
      }
    });
  }
  handleStripeResult(state: StripeAccountState) {
    if (state === StripeAccountState.CREATED) {
      Util.openSnackbar('Your account has been created. Please check your email for further details.', this.sb, 3000);
      this.lastDialog.close();
      this.openTicketDialog();
      return;
    } else if (state === StripeAccountState.UNKNOWN) {
      Util.openSnackbar('An error occurred', this.sb, 3000);
      this.lastDialog.close();
      this.openTicketDialog();
      return;
    }
    this.dialogState = 3;
  }
}
