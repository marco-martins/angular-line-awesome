import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularLineawesomeModule } from 'projects/angular-line-awesome/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularLineawesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
