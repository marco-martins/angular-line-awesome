import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularLineawesomeModule } from 'projects/angular-line-awesome/src/public-api';
import { IconsRegistry } from 'projects/angular-line-awesome/src/lib/services/icons-registry.service';
import {
  lasHippo,
  larHeart,
  lasHeart,
  labGithub,
  labGithubAlt,
  lasSquare,
  lasUser
} from 'projects/angular-line-awesome/icons';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularLineawesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: IconsRegistry) {
    iconRegistry.registerIcons([
      lasHippo,
      larHeart,
      lasHeart,
      labGithubAlt,
      lasSquare,
      lasUser,
      labGithub
    ]);
  }
}
