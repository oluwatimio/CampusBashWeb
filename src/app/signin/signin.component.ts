import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router';
import {MDCTextField} from '@material/textfield';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;
  pass: string;
  serviceAuth: AuthService;
  router: Router;
  constructor(Auths: AuthService, router: Router) {
    this.email = '';
    this.pass = '';
    this.serviceAuth = Auths;
   }

  ngOnInit() {
    const textField = new MDCTextField(document.querySelector('.emailt'));
    const textField2 = new MDCTextField(document.querySelector('.passt'));
  }

  SignIn() {
    this.serviceAuth.signIn(this.email, this.pass);
  }

  signInGoogle() {
    this.serviceAuth.googleSignIn();
  }

  signInFacebook() {
    this.serviceAuth.facebookSignIn();
  }



}
