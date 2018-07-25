import { Component, OnInit } from '@angular/core';
import {MDCSelect} from '@material/select';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  universities: string[] = ['University of Ottawa', 'Carelton University'];

  constructor() { }

  ngOnInit() {
  }

}
