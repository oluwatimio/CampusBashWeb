import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router';

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
  }

  SignIn() {
    console.log(this.email);
    this.serviceAuth.signIn(this.email, this.pass);
  }



}
