import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  AngularLineawesomeModule,
  LaIconLibrary
} from 'projects/angular-line-awesome/src/public-api';
import { lasHippo, lasHeart, labAngular } from 'projects/angular-line-awesome/icons';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularLineawesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: LaIconLibrary) {
    library.addIcons([lasHippo, lasHeart, labAngular]);
  }
}
