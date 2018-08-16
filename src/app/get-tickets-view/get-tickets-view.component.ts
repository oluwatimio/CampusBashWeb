import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../event-view/event/Event';
import {EventclickedService} from '../Services/eventclicked.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {Tickets} from '../Classes/Tickets';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined, log} from 'util';
import {ProfileService} from '../Services/profile.service';
import {User} from '../Classes/User';
import {Util} from '../Util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-get-tickets-view',
  templateUrl: './get-tickets-view.component.html',
  styleUrls: ['./get-tickets-view.component.css']
})
export class GetTicketsViewComponent implements OnInit {
  event: Event;
  service: EventclickedService;
  form: FormGroup;
  fb: FormBuilder;
  formCreated: Boolean = false;
  ticketFee = 0.0;
  validationMessages = [
    {type: 'pattern', message: 'Your username must contain only numbers (0 - 10)'},
    {type: 'maxValue', message: 'Max ticket number is 10'},
    {type: 'minValue', message: 'Minimum ticket number is o'}
  ];
  ticketMap = {};
  orderMap = {};
  private user: User = null;

  constructor(service: EventclickedService, private profileService: ProfileService, fb: FormBuilder, private snackBar: MatSnackBar,
              private router: Router) {
    this.service = service;
    this.fb = fb;
    this.profileService.getUserProfile().subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.service.localStorages.getItem<Event>('event').subscribe((event) => {
      this.event = event;
      this.createFormGroup();
    });
  }

  createFormGroup() {
    const group = {};
    this.event.tickets.forEach((ticket, index) => {
      group[String(index)] = new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]$')
      ]));
    });
    this.form = this.fb.group(group);
    this.form.valueChanges
      .subscribe((value) => {
        this.updateTicketMap(value);
      });
    this.formCreated = true;
  }

  getId(index: number): string {
    return String(index);
  }
  hasError(id: string, validation) {
    const item = this.form.get(id);
    return this.hasActualError(item.value, validation) && (item.dirty || item.touched);
  }
  private hasActualError(value: string, validation): boolean {
    if (isNullOrUndefined(value) || value.length === 0) {
      return false;
    } else if (!/\d/.test(value) && validation.type === this.validationMessages[0].type) {
      return true;
    } else if (parseInt(value, 10) < 0 && validation.type === this.validationMessages[2].type) {
      return true;
    } else if (parseInt(value, 10) > 10 && validation.type === this.validationMessages[1].type) {
      return true;
    }
    return false;
  }
  private hasGeneralError(value: string): boolean {
    if (isNullOrUndefined(value) || value.length === 0) {
      return false;
    } else if (!/\d/.test(value)) {
      return true;
    } else if (parseInt(value, 10) < 0) {
      return true;
    } else if (parseInt(value, 10) > 10) {
      return true;
    }
    return false;
  }
  private updateTicketMap(map) {
    let total = 0;
    this.event.tickets.forEach((ticket, index) => {
      const id = this.getId(index);
      const value = map[id] as string;
      if (!this.hasGeneralError(value) && !isNullOrUndefined(value) && value.length > 0) {
        this.ticketMap[ticket.name] = parseInt(value, 10);
        total += ticket.price * parseInt(value, 10);
      } else {
        delete this.ticketMap[ticket.name];
      }
    });
    console.log(this.ticketMap);
    this.ticketFee = total;
    this.orderMap = {
      ticketMap: this.ticketMap,
      ticketFee: this.ticketFee
    };
    this.service.changeTicketMessage(this.orderMap);
  }
  quantityLeft(ticket: Tickets): number {
    return ticket.quantity - ticket.ticketsSold;
  }
  isSoldOut(ticket: Tickets): boolean {
    return this.quantityLeft(ticket) <= 0;
  }
  async ticketRoute() {
    if (this.ticketFee > 0.0) {
      this.router.navigateByUrl('/payForTicket');
    } else if (Object.keys(this.ticketMap).length > 0) {
      const data = this.service.buildTicketPayload(this.ticketFee, this.ticketMap, null, this.user);
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
}

