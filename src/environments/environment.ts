// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import * as firebase from 'firebase';
export const environment = {
  production: false,
   config:{
    apiKey: "AIzaSyAnq8-n9iIIEZdDJUysVFKGPMqXDBGZ_fM",
    authDomain: "campusbash-dev.firebaseapp.com",
    databaseURL: "https://campusbash-dev.firebaseio.com",
    projectId: "campusbash-dev",
    storageBucket: "campusbash-dev.appspot.com",
    messagingSenderId: "408958432976"
  }
};

firebase.initializeApp(environment.config);
