import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../event-view/event/Event';
import {EventclickedService} from '../Services/eventclicked.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {QuantityDialogComponent} from '../quantity-dialog/quantity-dialog.component';
import {Tickets} from '../Classes/Tickets';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined, log} from 'util';

@Component({
  selector: 'app-get-tickets-view',
  templateUrl: './get-tickets-view.component.html',
  styleUrls: ['./get-tickets-view.component.css']
})
export class GetTicketsViewComponent implements OnInit {
  event: Event;
  service: EventclickedService;
  dialogRef: MatDialogRef<QuantityDialogComponent>;
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

  constructor(service: EventclickedService, private dialog: MatDialog, fb: FormBuilder) {
    this.service = service;
    this.fb = fb;
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
      // console.log(JSON.stringify(ticket));
      group[String(index)] = new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]$')
      ]));
    });
    this.form = this.fb.group(group);
    this.form.valueChanges
      .subscribe((value) => {
        this.updateTicketMap(value);
        console.log(JSON.stringify(value));
      });
    this.formCreated = true;
    console.log('Form created!!');
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef = this.dialog.open(QuantityDialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getPossibleQuantities(ticket: Tickets) {
    const quans = Array();
    const quantityLeft = ticket.quantity - ticket.ticketsSold;
    let end = quantityLeft;
    if (end > 10) {
      end = 10;
    }
    for (let i = 0; i <= end; i++) {
      quans.push(i);
    }
    return quans;
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
        this.ticketMap[ticket.name] = 0;
      }
    });
    console.log(this.ticketMap);
    this.ticketFee = total;
  }
  buy() {
  }
  quantityLeft(ticket: Tickets): number {
    return ticket.quantity - ticket.ticketsSold;
  }
  isSoldOut(ticket: Tickets): boolean {
    return this.quantityLeft(ticket) <= 0;
  }
  ticketRoute(): string {
    return '';
  }
}

