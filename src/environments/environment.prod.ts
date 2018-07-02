import * as firebase from 'firebase';
export const environment = {
  production: true,
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
