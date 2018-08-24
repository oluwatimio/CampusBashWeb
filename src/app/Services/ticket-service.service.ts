import { Injectable } from '@angular/core';
import {ProfileService} from './profile.service';
import {User} from '../Classes/User';
import {isNullOrUndefined} from 'util';
import * as firebase from 'firebase';
import {BehaviorSubject, Observable} from 'rxjs';
import {TicketMetaData} from '../Classes/TicketMetaData';
import {TicketPurchase} from '../Classes/TicketPurchase';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {
  private uid: string;
  private db = firebase.firestore();
  private tickets = new BehaviorSubject(null);
  constructor(private profileService: ProfileService) {
    this.profileService.getUserProfile().subscribe((user: User) => {
      console.log(user);
      if (!isNullOrUndefined(user)) {
        this.uid = user.uid;
        this.observeTickets();
      }
    });
  }

  private observeTickets() {
    this.db.collection('userTickets').where('buyerId', '==', this.uid)
      .onSnapshot(snapshot => {
        console.log('snapshot gotten');
        const tickets = [];
        snapshot.forEach(ticket => {
          tickets.push(<TicketMetaData> ticket.data());
        });
        this.tickets.next(tickets);
        console.log(tickets);
      });
  }
  getTickets(): Observable<TicketPurchase[]> {
    return this.tickets.asObservable();
  }
}
