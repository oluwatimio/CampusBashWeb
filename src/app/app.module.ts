import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventComponent} from './event-view/event/event.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
{path: 'events', component: EventComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    NavComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
    ),
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
