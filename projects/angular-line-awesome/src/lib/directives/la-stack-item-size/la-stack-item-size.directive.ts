import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { SizeProp } from '../../line-awesome.core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'la-icon[stackItemSize]',
  standalone: false
})
export class LaStackItemSizeDirective implements OnChanges {
  /**
   * Specify whether icon inside {@link LaStackComponent} should be rendered in
   * regular size (1x) or as a larger icon (2x).
   */
  @Input() stackItemSize: '1x' | '2x' = '1x';

  @Input() size?: SizeProp;

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      throw new Error(
        'la-icon is not allowed to customize size when used inside la-stack. ' +
        'Set size on the enclosing la-stack instead: <la-stack size="4x">...</la-stack>.',
      );
    }
  }
}
