import { Component, Input, OnChanges, SimpleChanges, HostBinding, Renderer2, Optional, ChangeDetectionStrategy } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { LaStackItemSizeDirective } from '../../directives/la-stack-item-size/la-stack-item-size.directive';
import {
  SizeProp,
  Styles,
  PullProp,
  RotateProp,
  Transform,
  FlipProp,
  LaProps,
  IconParams,
  IconProp,
  Icon,
  parseTransformString,
  applyCssTransforms,
  faNormalizeIcon,
  IconNamePrefix,
  laClassList
} from '../../line-awesome.core';

@Component({
  selector: 'la-icon',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaIconComponent implements OnChanges {
  @Input() icon: IconProp;
  @Input() size?: SizeProp;
  @Input() fixedWidth?: boolean;
  @Input() rotate?: RotateProp;
  @Input() flip?: FlipProp;
  @Input() pull?: PullProp;
  @Input() spin?: boolean;
  @Input() pulse?: boolean;
  @Input() border?: boolean;
  @Input() inverse?: boolean;
  @Input() styles?: Styles;
  @Input() classes?: string[] = [];
  @Input() transform?: string | Transform;
  @Input() mask?: IconProp;
  /**
   * Specify a title for the icon.
   * This text will be displayed in a tooltip on hover and presented to the
   * screen readers.
   */
  @Input() title?: string;

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;
  @HostBinding('class.ng-la-icon')
  @HostBinding('attr.title') get titleAttr(): string { return this.title; }

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    @Optional() private stackItem: LaStackItemSizeDirective,
  ) {}

  /**
   * Programmatically trigger rendering of the icon.
   *
   * This method is useful, when creating dynamically or
   * changing its inputs programmatically as in these cases icon won't be
   * re-rendered automatically.
   */
  render() {
    this.ngOnChanges({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.icon) {
      throw new Error('Property `icon` is required for `la-icon` components.');
    }

    if (changes) {
      const iconToBeRendered = faNormalizeIcon(this.icon);
      const params = this.buildParams();
      this.renderIcon(iconToBeRendered, params);
    }
  }

  protected buildParams() {
    const classOpts: LaProps = {
      flip: this.flip,
      spin: this.spin,
      pulse: this.pulse,
      border: this.border,
      inverse: this.inverse,
      size: this.size || null,
      pull: this.pull || null,
      rotate: this.rotate || null,
      fixedWidth: this.fixedWidth,
      stackItemSize: this.stackItem ? this.stackItem.stackItemSize : null
    };

    const parsedTransform = typeof this.transform === 'string' ? parseTransformString(this.transform) : this.transform || {};

    return {
      title: this.title,
      transform: parsedTransform,
      classes: [...laClassList(classOpts), ...this.classes],
      styles: this.styles != null ? this.styles : {}
    };
  }

  private renderIcon(definition: Icon, params: IconParams) {
    const renderedIcon: HTMLElement = this.renderer.createElement('i');
    // Put all classes together
    const klasses = [].concat([definition.prefix, `${IconNamePrefix}-${definition.iconName}`], params.classes);
    // Apply css transforms
    this.renderer.setStyle(renderedIcon, 'transform', applyCssTransforms(params.transform));
    // Apply css classes
    for (const klass of klasses) { this.renderer.addClass(renderedIcon, klass); }
    // Render icon HTML
    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.outerHTML);
  }
}
