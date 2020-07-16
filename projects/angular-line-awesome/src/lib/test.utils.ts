import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaIconComponent } from './components/la-icon/la-icon.component';
import { LaStackComponent } from './components/la-stack/la-stack.component';
import { LaStackItemSizeDirective } from './directives/la-stack-item-size/la-stack-item-size.directive';
import { AngularLineawesomeIcons } from './services/angular-line-awesome-icons.service';
import {
  lasUser,
  labGithub,
  labTwitter,
  lasDog,
  lasCat
} from 'projects/angular-line-awesome/icons';

export function queryByCss(fixture: ComponentFixture<any>, cssSelector: string): HTMLElement {
  return fixture.nativeElement.querySelector(cssSelector);
}

export function initTest<T>(component: Type<T>, providers?: any[]): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [CommonModule],
    declarations: [LaIconComponent, LaStackComponent, LaStackItemSizeDirective, component],
    providers
  });

  const iconsRegistry = TestBed.inject(AngularLineawesomeIcons);
  iconsRegistry.addIcons([lasUser, labGithub, labTwitter, lasDog, lasCat]);

  return TestBed.createComponent(component);
}
