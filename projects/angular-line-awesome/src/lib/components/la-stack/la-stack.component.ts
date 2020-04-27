import { OnInit, OnChanges, Component, Input, Renderer2, ElementRef, SimpleChanges } from '@angular/core';
import { SizeProp, IconNamePrefix } from '../../line-awesome.core';

@Component({
  selector: 'la-stack',
  // TODO: See if it is better to select la-icon and throw if it does not have stackItemSize directive
  template: `
    <ng-content select="la-icon[stackItemSize]"></ng-content>
  `,
})
export class LaStackComponent implements OnInit, OnChanges {
  /**
   * Size of the stacked icon.
   * Note that stacked icon is by default 2 times bigger, than non-stacked icon.
   * You'll need to set size using custom CSS to align stacked icon with a
   * simple one. E.g. `la-stack { font-size: 0.5em; }`.
   */
  @Input() size?: SizeProp;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'la-stack');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      if (changes.size.currentValue != null) {
        this.renderer.addClass(this.elementRef.nativeElement, `${IconNamePrefix}-${changes.size.currentValue}`);
      }
      if (changes.size.previousValue != null) {
        this.renderer.removeClass(this.elementRef.nativeElement, `${IconNamePrefix}-${changes.size.previousValue}`);
      }
    }
  }
}
