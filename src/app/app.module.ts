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
import {AngularFireAuthModule} from 'angularfire2/auth';


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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserSingle} from './Services/UserSingle';
import { HostingComponent } from './hosting/hosting.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'events', component: EventComponent},
  {path: '', component: TabsComponent},
  {path: 'addevent', component: AddeventComponent},
  {path: 'signup', component: SignupComponent}
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
    HostingComponent
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
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, EventService, SigninemitterService, UserSingle],
  bootstrap: [AppComponent]
})
export class AppModule { }
