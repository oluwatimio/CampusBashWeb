import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {isNullOrUndefined} from 'util';
import DocumentChange = firebase.firestore.DocumentChange;
import {UserTicket} from '../Classes/UserTicket';
import {TicketQuantity} from '../Classes/TicketQuantity';
import {BehaviorSubject, Observable} from 'rxjs';
import {TicketMetaData} from '../Classes/TicketMetaData';

@Injectable({
  providedIn: 'root'
})
export class EventDashboardService {
  private db = firebase.firestore();
  private liveMetaDatum = new BehaviorSubject(null);
  private liveTickets = new BehaviorSubject(null);
  private metadatas = {};
  private tickets: UserTicket[] = [];
  constructor() { }
  init(eventId: string) {
    this.db.collection('events').doc(eventId).collection('tickets')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(result => {
          this.parseData(result);
        });
      });
  }
  private parseData(data: DocumentChange) {
    const doc = data.doc.data();
    if (isNullOrUndefined(doc)) {
      return;
    }
    if (isNullOrUndefined(doc.transactionValid) || !doc.transactionValid) {
      return;
    }
    console.log(doc);
    const id: string = data.doc.id;
    const codes = doc.ticketCodes as any[];
    const total = doc.breakdown.totalFee;
    console.log(codes);
    codes.forEach((it: any) => {
      const code = this.mapToTicketMetadata(it, id);
      if (data.type === 'added' || data.type === 'modified') {
        this.metadatas[code.code] = code;
      } else {
        delete this.metadatas[code.code];
      }
    });
    console.log(this.metadatas);
    const q: TicketQuantity[] = [];
    const quantities = doc.tickets;
    for (const k in quantities) {
      if (!quantities.hasOwnProperty(k)) { continue; }
      q.push({
        name: k,
        quantity: quantities[k]
      });
    }

    const userTicket: UserTicket = {
      buyerEmail: doc.buyerEmail as string,
      buyerName: doc.buyerName as string,
      quantity: doc.quantity as number,
      ticketPurchaseId: id as string,
      totalPrice: total as number,
      quantities: q
    };

    if (data.type === 'added') {
      this.tickets.push(userTicket);
    } else if (data.type === 'modified') {
      const index = this.findTicket(userTicket);
      if (index !== -1) {
        this.tickets[index] = userTicket;
      }
    } else {
      const index = this.findTicket(userTicket);
      this.tickets.splice(index, 1);
    }
    console.log(this.tickets);
    this.liveTickets.next(this.tickets);
    this.liveMetaDatum.next(this.metadatas);
  }
  private mapToTicketMetadata(map: any, id: string): any {
    return {
      code: map.code,
      qrUrl: map.qrUrl,
      isUsed: map.isUsed,
      ticketName: map.ticketName,
      ticketPurchaseId: id
    };
  }
  private findTicket(ticket: UserTicket): number {
    let index = -1;
    for (let i = 0; i < this.tickets.length; i++) {
      const u = this.tickets[i];
      if (u.ticketPurchaseId === ticket.ticketPurchaseId) {
        index = i;
        break;
      }
    }
    return index;
  }
  getMetaDatum(): Observable<any> {
    return this.liveMetaDatum.asObservable();
  }
  getTickets(): Observable<UserTicket[]> {
    return this.liveTickets.asObservable();
  }
  updateTicket(eventId: string, ticketId: string, value: any, code: string) {
    const ref = this.db.collection('events').doc(eventId).collection('tickets').doc(ticketId);
    this.db.runTransaction((transaction) => {
      return transaction.get(ref).then((doc) => {
        if (!doc.exists) {
          console.log('document does not exist');
        } else  {
          const purchase = doc.data();
          const codes = purchase.ticketCodes as any[];
          console.log(codes);
          for (let i = 0; i < codes.length; i++) {
            const cd = codes[i];
            if (cd.code === code) {
              cd.isUsed = value;
              break;
            }
          }
          console.log(codes);
          transaction.update(ref, {ticketCodes: codes});
          console.log('ticket updated');
        }
      });
    });
  }
}
