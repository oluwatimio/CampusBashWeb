import { Component, OnInit } from '@angular/core';
import {Tickets} from '../Classes/Tickets';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.css']
})
export class QuantityDialogComponent implements OnInit {
  ticket: Tickets;

  constructor(private dialogRef: MatDialogRef<QuantityDialogComponent>) { }

  ngOnInit() {
  }
  getPossibleQuantities() {
    const quans = Array();
    const quantityLeft = this.ticket.quantity - this.ticket.ticketsSold;
    for (let i = 0; i <= quantityLeft; i++) {
      quans.push(i);
    }
    return quans;
  }
  numberClicked(value: number) {
    this.dialogRef.close(value);
  }

}
