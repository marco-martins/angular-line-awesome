import { Component } from '@angular/core';
import { Transform, Icon } from 'angular-line-awesome/lib/line-awesome.core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-example';

  iconName: string[] = ['lab', 'github-alt'];

  iconSize = '2x';

  transform: Transform = {
    size: 10,
    x: 1,
    y: -1,
    rotate: 90,
    flipX: true,
    flipY: true
  };

  square: Icon = { prefix: 'las', iconName: 'square' };
  user: Icon = { prefix: 'las', iconName: 'user' };
}
