import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import {MatCardModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {FooterComponent} from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule
  ],
  declarations: [EventComponent, FooterComponent]
})
export class EventViewModule { }
