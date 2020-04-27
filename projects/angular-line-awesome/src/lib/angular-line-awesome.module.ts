import { NgModule } from '@angular/core';
import { LaIconComponent } from './components/la-icon/la-icon.component';
import { LaStackComponent } from './components/la-stack/la-stack.component';
import { LaStackItemSizeDirective } from './directives/la-stack-item-size/la-stack-item-size.directive';

@NgModule({
  declarations: [
    LaIconComponent,
    LaStackComponent,
    LaStackItemSizeDirective
  ],
  imports: [],
  exports: [
    LaIconComponent,
    LaStackComponent,
    LaStackItemSizeDirective
  ]
})
export class AngularLineawesomeModule { }
