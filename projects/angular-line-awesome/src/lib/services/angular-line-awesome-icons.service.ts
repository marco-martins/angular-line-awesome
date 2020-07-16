import { Injectable } from '@angular/core';
import { Icon, LineAwesomeIcon } from '../line-awesome.core';

@Injectable({
  providedIn: 'root'
})
export class AngularLineawesomeIcons {
  private registry = new Map<string, string>();

  public addIcons(icons: LineAwesomeIcon[]): void {
    icons.forEach((icon: LineAwesomeIcon) => {
      this.registry.set(icon.name, icon.data);
    });
  }

  public getIcon(icon: Icon): string | undefined {
    const iconName = `${icon.prefix}-${icon.iconName}`;

    if (!this.registry.has(iconName)) {
      console.warn(
        `We could not find the Icon with the name ${iconName}, did you add it to the Icon registry?`
      );
    }
    return this.registry.get(iconName);
  }
}
