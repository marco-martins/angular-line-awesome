import { Injectable } from '@angular/core';
import { Icon, LineAwesomeIcon } from '../line-awesome.core';

@Injectable({
  providedIn: 'root'
})
export class LaIconLibrary {
  private registry = new Map<string, string>();

  public addIcons(icons: LineAwesomeIcon[]): void {
    icons.forEach((icon: LineAwesomeIcon) => {
      this.registry.set(icon.name, icon.data);
    });
  }

  public getIcon(icon: Icon): string | undefined {
    const iconName = `${icon.prefix}-${icon.iconName}`;

    if (!this.registry.has(iconName)) {
      throw new Error(
        `Could not find icon with prefix=${icon.prefix} and iconName=${icon.iconName} in the icon library.`
      );
    }
    return this.registry.get(iconName);
  }
}
