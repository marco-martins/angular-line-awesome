import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Provider, Type } from '@angular/core';
import { LaIconLibrary } from './services/la-icon-library.service';
import {
  lasUser,
  labGithub,
  labTwitter,
  lasDog,
  lasCat,
  lasCircle
} from 'projects/angular-line-awesome/icons';

export function queryByCss(fixture: ComponentFixture<unknown>, cssSelector: string): HTMLElement {
  return fixture.nativeElement.querySelector(cssSelector);
}

export function initTest<T>(component: Type<T>, providers?: Provider[]): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [component],
    providers
  });

  const iconLibrary = TestBed.inject(LaIconLibrary);
  iconLibrary.addIcons([lasUser, labGithub, labTwitter, lasDog, lasCat, lasCircle]);

  return TestBed.createComponent(component);
}
