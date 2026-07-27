import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { IconProp, SizeProp, Transform, Icon } from 'projects/angular-line-awesome/src/lib/line-awesome.core';
import { LaIconComponent } from '../../../angular-line-awesome/src/lib/components/la-icon/la-icon.component';
import { LaStackComponent } from '../../../angular-line-awesome/src/lib/components/la-stack/la-stack.component';
import { LaStackItemSizeDirective } from '../../../angular-line-awesome/src/lib/directives/la-stack-item-size/la-stack-item-size.directive';
import { LaIconLibrary } from '../../../angular-line-awesome/src/lib/services/la-icon-library.service';
import { lasHippo, lasHeart, labAngular } from 'projects/angular-line-awesome/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LaIconComponent, LaStackComponent, LaStackItemSizeDirective]
})
export class AppComponent {
  private iconLibrary = inject(LaIconLibrary);

  constructor() {
    this.iconLibrary.addIcons([lasHippo, lasHeart, labAngular]);
  }

  title = 'demo-example';

  iconName: IconProp = ['las', 'hippo'];

  iconSize: SizeProp = '2x';

  transform: Transform = {
    size: 15,
    x: 5,
    y: -5,
    rotate: 90,
    flipX: true,
    flipY: true
  };

  heartIcon: Icon = { prefix: 'las', iconName: 'heart' };
  angularIcon: Icon = { prefix: 'lab', iconName: 'angular' };
}
