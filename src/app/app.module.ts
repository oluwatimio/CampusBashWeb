import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventComponent} from './event-view/event/event.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule, MatNativeDateModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TabsComponent } from './tabs/tabs.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './Services/auth.service';
import { SignupComponent } from './signup/signup.component';
import {EventService} from './Services/event.service';
import { SearchComponent } from './search/search.component';
import { AddeventComponent } from './addevent/addevent.component';
import {SigninemitterService} from './Services/signinemitter.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserSingle} from './Services/UserSingle';
import { HostingComponent } from './hosting/hosting.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { EventclickedService } from './Services/eventclicked.service';
import { MappComponent } from './mapp/mapp.component';
import { ProfilecreatorComponent } from './profilecreator/profilecreator.component';
import {ProfileService} from './Services/profile.service';
import {environment} from '../environments/environment';
import {InterestsComponent} from './interests/interests.component';
import { ChooseuniComponent } from './chooseuni/chooseuni.component';
import { GetTicketsViewComponent } from './get-tickets-view/get-tickets-view.component';
import { PayForTicketComponent } from './pay-for-ticket/pay-for-ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketPurchaseComponent } from './ticket-purchase/ticket-purchase.component';
import { TicketScannerComponent } from './ticket-scanner/ticket-scanner.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'events', component: EventComponent},
  {path: 'event/:eventId', component: EventdetailComponent},
  {path: '', component: TabsComponent},
  {path: 'tabs', component: TabsComponent},
  {path: 'addevent', component: AddeventComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'detail/:eventId', component: EventdetailComponent},
  {path: 'mapp', component: MappComponent},
  {path: 'profilec', component: ProfilecreatorComponent},
  {path: 'interests', component: InterestsComponent},
  {path: 'university', component: ChooseuniComponent},
  {path: ':eventId/buyTicket', component: GetTicketsViewComponent},
  {path: 'payForTicket', component: PayForTicketComponent},
  {path: 'ticketPurchase/:id', component: TicketPurchaseComponent},
  {path: 'scan/:eventId', component: TicketScannerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    NavComponent,
    TabsComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    SearchComponent,
    AddeventComponent,
    HostingComponent,
    EventdetailComponent,
    MappComponent,
    ProfilecreatorComponent,
    InterestsComponent,
    ChooseuniComponent,
    GetTicketsViewComponent,
    PayForTicketComponent,
    TicketsComponent,
    TicketPurchaseComponent,
    TicketScannerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
    ),
    MatToolbarModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    ZXingScannerModule,
  ],
  providers: [AuthService, EventService, SigninemitterService, UserSingle, EventclickedService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
