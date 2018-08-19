import { Component, OnInit } from '@angular/core';
import {TicketPurchase} from '../Classes/TicketPurchase';
import {Util} from '../Util';
import {TicketServiceService} from '../Services/ticket-service.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets: TicketPurchase[] = [];
  constructor(private ticketsService: TicketServiceService) {
    this.ticketsService.getTickets().subscribe((purchases) => {
      while (this.tickets.length > 0) {
        this.tickets.pop();
      }
      if (!isNullOrUndefined(purchases)) {
        purchases.forEach(purchase => this.tickets.push(purchase));
      }
    });
  }

  ngOnInit() {
  }
  getDate(date: number): string {
    return Util.getDate(date);
  }

}
