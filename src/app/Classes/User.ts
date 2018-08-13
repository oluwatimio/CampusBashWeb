import {Preference} from './Preference';

export class User {
  country: string;
  email: string;
  fcmToken: string;
  preference: Preference[];
  stripeCustomerId: string;
  stripeAccountId: string;
  summary: string;
  uid: string;
  university: string;
  userName: string;
}
