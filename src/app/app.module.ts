import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventComponent} from './event-view/event/event.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TabsComponent } from './tabs/tabs.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'events', component: EventComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    NavComponent,
    TabsComponent,
    FooterComponent,
    SigninComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
