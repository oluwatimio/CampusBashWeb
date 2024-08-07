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
import * as firebase from 'firebase';
import {Media} from '../Classes/Media';
import {StripeAccountState, StripeService} from '../Services/stripe.service';
import {isNullOrUndefined} from 'util';
import {Util} from '../Util';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';

const mdcDialog = require('@material/dialog');
const MDCDialog = mdcDialog.MDCDialog;

declare var require: any;
declare var google: any;
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
  showProg: boolean;
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
  imageLink: string;
  ps: ProfileService;
  downloadUrlImage: string;
  user: any;
  userProfile: User;
  startTime: string;
  endTime: string;
  autocomplete: any;
  lastDialog = null;
  dialogState = 1;
  stripeSubscription: Subscription;
  constructor(ps: ProfileService, private eventS: EventService, private router: Router, private stripeService: StripeService,
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
    this.imageLink = '';
    this.downloadUrlImage = '';
    this.ps = ps;
    this.showProg = false;
  }

  ngOnInit() {
    this.ps.getCurrentUser().subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
      } else if (user === undefined || user === null) {
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
    if (!isNullOrUndefined(this.userProfile) && this.checkedPaid === true &&
      (isNullOrUndefined(this.userProfile.stripeAccountId) || this.userProfile.stripeAccountId.trim().length === 0)) {
      this.openStripeQueryDialog();
      return;
    }
    if (this.ticketPaidPrice.value !== '' && this.ticketPaidPrice.value !== undefined) {
      const ticket = new Tickets('CA$', this.ticketDescription.value, 10, 1,
        this.ticketName.value, parseFloat(this.ticketPaidPrice.value), parseInt(this.ticketQuantity.value, 10), 0,
        0, 0, '', this.ticketType, true);
      this.tickets.push(ticket);
    } else {
      const ticket = new Tickets('CA$', this.ticketDescription.value, 10, 1,
        this.ticketName.value, 0, parseInt(this.ticketQuantity.value, 10), 0, 0, 0,
        '', this.ticketType, true);
      this.tickets.push(ticket);
    }
    this.checkedPaid = undefined;
    this.checkedFree = undefined;
    this.ticketPaidPrice.value = undefined;

  }

  uploadEvent() {
    this.showProg = true;
    if (this.userProfile !== undefined && this.user !== undefined) {
      this.startDateToLong();
      this.endDateToLong();
      const creator = new Creator(this.user.uid, this.userProfile.userName, this.userProfile.stripeAccountId, '');
      const cr = JSON.parse( JSON.stringify(creator));
      const ticks = this.tickets.map((obj) => {
        return Object.assign({}, obj);
      });
      const media = new Media(this.imageLink, 'image', this.downloadUrlImage);
      const media2 = JSON.parse(JSON.stringify(media));
      if (this.startTimeNumber < this.endTimeNumber || this.eventName !== '' || this.eventDescription !== '') {
        const event = new Event('', cr, this.eventDescription, this.endTimeNumber, '', this.eventName, this.eventTypeSelected,
          null, this.autocomplete.getPlace()['place_id'], media2, this.startTimeNumber, ticks, '',
          this.userProfile.university, 0);
        this.eventS.addEvent(event);
        this.showProg = false;
      } else {
        this.sb.open('Your start date is before your end date or a field is empty', null, {duration: 5000});
      }
    } else {
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
    this.startTimeNumber = date.getTime();
  }

  endDateToLong() {
    const date = new Date(this.endTime['_a'][0], this.endTime['_a'][1], this.endTime['_a'][2],
      this.endTime['_a'][3], this.endTime['_a'][4]);
    this.endTimeNumber = date.getTime();
  }
  onFileSelected(event: any) {
    this.imageLink = this.imageLink.replace(/\\/g, '/')
    const array = this.imageLink.split('/');
    this.imageLink = array[array.length - 1];
    const date = new Date();
    date.getTime()
    const fn = this.imageLink;
    this.imageLink = 'event_placeholder_images' + '/' + this.user.uid + '/' + date.getTime().toString() + fn;
    let imageurl;
    this.showProg = true;
    if (this.imageLink != null) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(this.imageLink);
      imageurl = imageRef;
      const file = event.target.files;
      // document.getElementById('displayProg').style.visibility = 'visible';
      const uploadTask = imageRef.put(file[0]);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        //this.progress = ((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100).toString();
        //console.log('Upload is ' + this.progress + '% done');
      });

      uploadTask.then((snapshot) => {
        imageurl.getDownloadURL().then((url) => {
          this.downloadUrlImage = url;
          this.openImagePrev();
          this.showProg = false;
        });
        //this.progress = '0';

      }).catch((error) => {
      });

    }
  }

  openImagePrev() {
    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    const dialog = new MDCDialog(document.querySelector('#imagePrev'));

    dialog.show();
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
      } else {
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
