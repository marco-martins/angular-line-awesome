import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
  Renderer2,
  Optional,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
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
  laClassList,
  IconNamePrefix as prefix
} from '../../line-awesome.core';
import { LaIconLibrary } from '../../services/la-icon-library.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'la-icon',
  template: '',
  styleUrls: ['./la-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
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
  @Input() title?: string;

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;
  /**
   * Specify a title for the icon.
   * This text will be displayed in a tooltip on hover and presented to the
   * screen readers.
   */
  @HostBinding('attr.title')
  get titleAttr(): string {
    return this.title;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private iconRegistry: LaIconLibrary,
    @Optional() private stackItem: LaStackItemSizeDirective
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
      throw new Error('Property `icon` is required for `la-icon` component.');
    }

    if (changes) {
      const iconDefinition = faNormalizeIcon(this.icon);
      const params = this.buildParams();
      this.renderIcon(iconDefinition, params);
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

    const parsedTransform =
      typeof this.transform === 'string'
        ? parseTransformString(this.transform)
        : this.transform || {};

    return {
      title: this.title,
      transform: parsedTransform,
      classes: [...laClassList(classOpts), ...this.classes],
      styles: this.styles != null ? this.styles : {}
    };
  }

  private renderIcon(definition: Icon, params: IconParams) {
    const svgData = this.iconRegistry.getIcon(definition);
    const renderedIcon: SVGElement = this.svgElementFromString(svgData);
    const attributes = {
      'aria-hidden': 'true',
      role: 'img',
      focusable: 'false',
      // Note: prefix and prefix-icon-name classes are helpfully to make the tests
      class: [definition.prefix, `${prefix}-${definition.iconName}`, ...params.classes].join(' ')
    };
    // Apply attributes, note the classes also goes here
    for (const [key, value] of Object.entries(attributes)) {
      this.renderer.setAttribute(renderedIcon, key, value);
    }
    // Apply css transforms
    this.renderer.setStyle(renderedIcon, 'transform', applyCssTransforms(params.transform));
    // Inject svg icon
    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.outerHTML);
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div: HTMLElement = this.renderer.createElement('div');
    div.innerHTML = svgContent;
    return div.querySelector('svg');
  }
}
