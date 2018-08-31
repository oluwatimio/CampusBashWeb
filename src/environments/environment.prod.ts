import * as firebase from 'firebase';
export const environment = {
  production: true,
  stripeKey: 'pk_live_8mv4tYyz8VBXXjUSdmQmOtcD',
  createStripeAccountUrl: 'https://us-central1-campusbash-e0ca8.cloudfunctions.net/stripe/:uid/:token/createStripeAccount',
  createStripeAccountOauthUrl: `https://connect.stripe.com/oauth/authorize?response_type=code&' +
  'client_id=ca_CZDCW0OVIvEazokpluKtoXH0VR6QPhJF&scope=read_write`,
  config: {
    apiKey: 'AIzaSyDqLRjEOukniNE3E3z3TczUkPxNx46aEL4',
    authDomain: 'campusbash-e0ca8.firebaseapp.com',
    databaseURL: 'https://campusbash-e0ca8.firebaseio.com',
    projectId: 'campusbash-e0ca8',
    storageBucket: 'campusbash-e0ca8.appspot.com',
    messagingSenderId: '590244169623'
  }
};
firebase.initializeApp(environment.config);
