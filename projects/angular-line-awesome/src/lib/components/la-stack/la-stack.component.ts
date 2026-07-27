import {
  OnInit,
  OnChanges,
  Component,
  Input,
  Renderer2,
  ElementRef,
  SimpleChanges,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { SizeProp, IconNamePrefix } from '../../line-awesome.core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'la-stack',
  // TODO: See if it is better to select la-icon and throw if it does not have stackItemSize directive
  template: ` <ng-content select="la-icon[stackItemSize]"></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaStackComponent implements OnInit, OnChanges {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  /**
   * Size of the stacked icon.
   * Note that stacked icon is by default 2 times bigger, than non-stacked icon.
   * You'll need to set size using custom CSS to align stacked icon with a
   * simple one. E.g. `la-stack { font-size: 0.5em; }`.
   */
  @Input() size?: SizeProp;

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'la-stack');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      if (changes.size.currentValue != null) {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          `${IconNamePrefix}-${changes.size.currentValue}`
        );
      }
      if (changes.size.previousValue != null) {
        this.renderer.removeClass(
          this.elementRef.nativeElement,
          `${IconNamePrefix}-${changes.size.previousValue}`
        );
      }
    }
  }
}
