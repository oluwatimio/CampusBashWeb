import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const textField = new MDCTextField(document.querySelector('.name'));
    const textField2 = new MDCTextField(document.querySelector('.description'));

    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('change', () => {
      alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    });

    const textField3 = new MDCTextField(document.querySelector('.where'));

    const textField4 = new MDCTextField(document.querySelector('.address'));
  }

}
