import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
  Renderer2,
  Optional,
  ChangeDetectionStrategy,
  Inject,
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
  IconNamePrefix,
  laClassList
} from '../../line-awesome.core';
import { AngularLineawesomeIcons } from '../../services/angular-line-awesome-icons.service';
import { DOCUMENT } from '@angular/common';

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
  /**
   * Specify a title for the icon.
   * This text will be displayed in a tooltip on hover and presented to the
   * screen readers.
   */
  @Input() title?: string;

  private svgIcon: SVGElement;

  @HostBinding('innerHTML') renderedIconHTML: SafeHtml;
  @HostBinding('class.ng-la-icon')
  @HostBinding('attr.title')
  get titleAttr(): string {
    return this.title;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    // private element: ElementRef,
    private iconRegistry: AngularLineawesomeIcons,
    @Optional() private stackItem: LaStackItemSizeDirective,
    @Optional() @Inject(DOCUMENT) private document: any
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
    // Put all classes together
    const klasses = [
      definition.prefix,
      ...params.classes,
      `${IconNamePrefix}-${definition.iconName}`,
      'la-svg-inline'
    ];
    // Apply css classes
    for (const klass of klasses) {
      this.renderer.addClass(renderedIcon, klass);
    }
    // Apply css transforms
    this.renderer.setStyle(renderedIcon, 'transform', applyCssTransforms(params.transform));
    // Apply attributes
    this.renderer.setAttribute(renderedIcon, 'role', 'img');
    this.renderer.setAttribute(renderedIcon, 'aria-hidden', 'true');
    this.renderer.setAttribute(renderedIcon, 'focusable', 'false');
    // Inject svg icon
    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(renderedIcon.outerHTML);
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div: HTMLElement = this.renderer.createElement('div');
    div.innerHTML = svgContent;
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }
}
