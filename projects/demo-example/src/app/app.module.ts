import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  AngularLineawesomeModule,
  AngularLineawesomeIcons
} from 'projects/angular-line-awesome/src/public-api';
import { lasHippo, lasHeart, labAngular } from 'projects/angular-line-awesome/icons';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularLineawesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(icons: AngularLineawesomeIcons) {
    icons.addIcons([lasHippo, lasHeart, labAngular]);
  }
}
