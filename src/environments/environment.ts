// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import * as firebase from 'firebase';
export const environment = {
  production: false,
  stripeKey: 'pk_test_CVyOXRhK6S5K0RlHkLzIiReJ',
  createStripeAccountUrl: 'https://us-central1-campusbash-dev.cloudfunctions.net/stripe/:uid/:token/createStripeAccount',
  createStripeAccountOauthUrl: 'https://connect.stripe.com/oauth/authorize?response_type=code&' +
  'client_id=ca_CZDCdiBIFm2webGK1uZavYZH0bcmFBgR&scope=read_write',
   config: {
    apiKey: "AIzaSyAnq8-n9iIIEZdDJUysVFKGPMqXDBGZ_fM",
    authDomain: "campusbash-dev.firebaseapp.com",
    databaseURL: "https://campusbash-dev.firebaseio.com",
    projectId: "campusbash-dev",
    storageBucket: "campusbash-dev.appspot.com",
    messagingSenderId: "408958432976"
  }
};

firebase.initializeApp(environment.config);
