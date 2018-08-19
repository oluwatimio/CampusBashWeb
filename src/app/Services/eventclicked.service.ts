import {Injectable} from '@angular/core';
import {Event} from '../event-view/event/Event';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {BehaviorSubject} from 'rxjs';
import * as firebase from 'firebase/app';
import {User} from '../Classes/User';
import {Util} from '../Util';
import {Constants} from '../Constants';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class EventclickedService {
  private ticketSource = new BehaviorSubject(null);
  private db = firebase.firestore();
  ticketMessage = this.ticketSource.asObservable();
  currentClicked: Event;
  localStorages: LocalStorage;
  constructor(protected localStorage: LocalStorage) {
    this.localStorages = localStorage;
  }

  setEventClicked(event: Event) {
    this.localStorages.setItem('event', event).subscribe(() => {
      console.log(event);
    });
  }
  getEventClicked() {
    return this.currentClicked;
  }
  changeTicketMessage(data) {
    this.ticketSource.next(data);
  }
  async addTicket(ticketData: any, event: Event): Promise<Boolean> {
    try {
      await this.db.collection('events').doc(event.eventId)
        .collection('tickets').add(ticketData);
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
  buildTicketPayload(ticketFee: number, ticketData: any, cardToken: string, user: User): any {
    if (user === null) {
      return null;
    }
    let quantity = 0;
    for (const key in ticketData) {
      if (!ticketData.hasOwnProperty(key)) {
        continue;
      }
      quantity += ticketData[key];
    }

    if (quantity <= 0) {
      return null;
    }
    const bd = Util.getTicketBreakdown(ticketFee);
    let stripeAcctId = null;
    let stripeCustId = null;
    if (!isNullOrUndefined(user.stripeAccountId)) {
      stripeAcctId = user.stripeAccountId;
    }
    if (!isNullOrUndefined(user.stripeCustomerId)) {
      stripeCustId = user.stripeCustomerId;
    }
    return {
      buyerId: user.uid,
      buyerEmail: user.email,
      buyerName: user.userName,
      currency: 'CA$',
      quantity: quantity,
      stripeAccountId: stripeAcctId,
      stripeCustomerId: stripeCustId,
      token: cardToken,
      timeSpent: Date.now(),
      total: bd[Constants.TOTAL_FEE],
      breakdown: bd,
      tickets: ticketData
    };
  }
}
