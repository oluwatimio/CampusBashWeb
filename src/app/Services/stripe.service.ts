import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService} from './auth.service';
import {isNullOrUndefined} from 'util';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private stripeAccountResponse = new BehaviorSubject(null);
  private accountUpdateSent = false;
  constructor(private http: HttpClient, private user: AuthService) {  }
  createdStripeAccount(): Observable<StripeAccountState> {
    this.accountUpdateSent = false;
    let url = environment.createStripeAccountUrl;
    this.user.user.subscribe(async (value) => {
      if (!isNullOrUndefined(value) && !this.accountUpdateSent) {
        const token = await this.user.getIdToken();
        const uid = this.user.getUid();
        url = url.replace(':uid', uid);
        url = url.replace(':token', token);
        console.log(url);
        const body = {
          uid: value.uid,
          email: value.email,
          country: 'CA'
        };
        this.http.post(url, body)
          .subscribe(
            (res: AccountResponse) => {
              console.log(res);
              this.handleStripeAccountResponse(res.status);
              this.accountUpdateSent = true;
            },
            err => {
              console.log('Error occured');
              this.stripeAccountResponse.next(StripeAccountState.UNKNOWN);
              this.accountUpdateSent = true;
            }
          );
      }
    });
    return this.stripeAccountResponse.asObservable();
  }
  private handleStripeAccountResponse(code: number) {
    let state: StripeAccountState;
    console.log(code);
    if (code === 422) {
      state = StripeAccountState.EXISTS;
    } else if (code === 200) {
      state = StripeAccountState.CREATED;
    } else {
      state = StripeAccountState.UNKNOWN;
    }
    this.stripeAccountResponse.next(state);
  }
}

export enum StripeAccountState {
  EXISTS,
  CREATED,
  UNKNOWN
}

interface AccountResponse {
  status: number;
  message: string;
}
