import { Injectable } from '@angular/core';
import { IconProp, Icon } from '../line-awesome.core';
import { LineAwesomeIcon } from 'projects/angular-line-awesome/icons';

@Injectable({
  providedIn: 'root'
})
export class IconsRegistry {
  private registry = new Map<IconProp, string>();

  public registerIcons(icons: LineAwesomeIcon[]): void {
    icons.forEach((icon: LineAwesomeIcon) => {
      this.registry.set(icon.name, icon.data);
    });
  }

  public getIcon(icon: Icon): string | undefined {
    const iconDefinition = `${icon.prefix}-${icon.iconName}`;

    if (!this.registry.has(iconDefinition)) {
      console.warn(
        `We could not find the Icon with the name ${iconDefinition}, did you add it to the Icon registry?`
      );
    }
    return this.registry.get(iconDefinition);
  }
}
