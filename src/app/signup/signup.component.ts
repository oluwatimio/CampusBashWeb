import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  email: string;
  pass: string;
  universitySelected: string;
  countrySelected: string;
  authS: AuthService;
  constructor(private _formBuilder: FormBuilder, authS: AuthService) {
    this.email = '';
    this.pass = '';
    this.universitySelected = '';
    this.countrySelected = '';
    this.authS = authS;
  }

  ngOnInit() {
    this.authS.signinAno();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  signUp() {
    this.authS.signUp(this.email, this.pass);
  }

}
