import { Component } from '@angular/core';
import { Transform, Icon } from 'projects/angular-line-awesome/src/lib/line-awesome.core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-example';

  iconName: string[] = ['las', 'hippo'];

  iconSize = '2x';

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
