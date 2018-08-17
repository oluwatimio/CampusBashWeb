import {Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import {EventclickedService} from '../Services/eventclicked.service';
import {Util} from '../Util';
import {Constants} from '../Constants';
import {Router} from '@angular/router';
import {Event} from '../event-view/event/Event';
import {MatSnackBar} from '@angular/material';
import {User} from '../Classes/User';
import {ProfileService} from '../Services/profile.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-pay-for-ticket',
  templateUrl: './pay-for-ticket.component.html',
  styleUrls: ['./pay-for-ticket.component.css']
})
export class PayForTicketComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  profileService: ProfileService;

  user: User;
  event: Event;
  feeSeen: Boolean = false;
  ticketData: any;
  ticketFee = 0;
  paymentFee = 0;
  serviceFee = 0;
  total = 0;
  constructor(private cd: ChangeDetectorRef, private service: EventclickedService, profileService: ProfileService,
              private snackBar: MatSnackBar, private router: Router) {
    this.profileService = profileService;
  }

  ngOnInit() {
    this.service.localStorages.getItem<Event>('event').subscribe((event) => {
      this.event = event;
    });
    this.service.ticketMessage.subscribe(message => {
      if (message.hasOwnProperty('ticketFee')) {
        this.ticketData = message;
        this.updateBreakdown();
        this.feeSeen = true;
      }
    });
    this.profileService.getUserProfile().subscribe((user: User) => {
      this.user = user;
    });
  }

  ngAfterViewInit() {
    this.card = elements.create('card', {
      hidePostalCode: true
    });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  updateBreakdown() {
    this.ticketFee = this.ticketData.ticketFee;
    const data = Util.getTicketBreakdown(this.ticketFee);
    this.ticketFee = data[Constants.TICKET_FEE];
    this.serviceFee = data[Constants.SERVICE_FEE];
    this.paymentFee = data[Constants.PAYMENT_FEE];
    this.total = data[Constants.TOTAL_FEE];
  }

  async buy() {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
      this.error = 'An error occurred';
      return;
    }
    const data = this.service.buildTicketPayload(this.ticketFee, this.ticketData.ticketMap, token.id, this.user);
    console.log(data);
    const result = await this.service.addTicket(data, this.event);
    if (result === true) {
      Util.openSnackbar('Ticket purchase complete, please check your email', this.snackBar);
    } else {
      Util.openSnackbar('Oops, something went wrong, we could not process your ticket', this.snackBar);
    }
    this.router.navigateByUrl('');
  }

}
