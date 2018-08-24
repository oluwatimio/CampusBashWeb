import { Component, OnInit } from '@angular/core';
import {TicketServiceService} from '../Services/ticket-service.service';
import {TicketPurchase} from '../Classes/TicketPurchase';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute} from '@angular/router';
import {TicketMetaData} from '../Classes/TicketMetaData';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.css']
})
export class TicketPurchaseComponent implements OnInit {
  ticketPurchase: TicketPurchase = null;
  constructor(private ticketsService: TicketServiceService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.ticketsService.getTickets().subscribe((tickets: TicketPurchase[]) => {
      if (!isNullOrUndefined(tickets)) {
        for (let i = 0; i < tickets.length; i++) {
          const ticket = tickets[i];
          if (ticket.ticketId === id) {
            this.ticketPurchase = ticket;
            break;
          }
        }
      }
    });
  }

  ngOnInit() {
  }

}
