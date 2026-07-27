// TYPES
export type IconPrefix = 'las' | 'lab' | 'lar';
export type FlipProp = 'horizontal' | 'vertical' | 'both';
export type PullProp = 'left' | 'right';
export type RotateProp = 90 | 180 | 270;
export type SizeProp =
  | 'xs'
  | 'lg'
  | 'sm'
  | 'lx'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x';
export type IconProp = IconName | [IconPrefix, IconName] | IconLookup;
export type IconName = string;

// INTERFACES
export type Styles = Record<string, string>;
export interface IconLookup {
  prefix: IconPrefix;
  iconName: IconName;
}
export interface Icon {
  prefix: IconPrefix;
  iconName: IconName;
}
export interface LaProps {
  mask?: IconProp;
  className?: string;
  size?: SizeProp | null;
  fixedWidth?: boolean;
  rotate?: RotateProp | null;
  flip?: FlipProp;
  pull?: PullProp | null;
  spin?: boolean;
  pulse?: boolean;
  border?: boolean;
  counter?: boolean;
  inverse?: boolean;
  transform?: string | Transform;
  style?: Styles;
  stackItemSize?: '1x' | '2x' | null;
}

export interface Transform {
  size?: number;
  x?: number;
  y?: number;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
}

export interface IconParams {
  title?: string;
  classes: string[];
  attributes?: Attributes;
  styles?: Styles;
  transform?: Transform;
}

export type Attributes = Record<string, number | string>;

export interface LineAwesomeIcon {
  name: string;
  data: string;
}

// FUNCTION HANDLERS
export const IconNamePrefix = 'la';
export const IconDefaultPrefix = 'las';

export const isIconLookup = (i: IconProp): i is Icon => {
  return (i as Icon).prefix !== undefined && (i as Icon).iconName !== undefined;
};

export const faNormalizeIcon = (icon: IconProp): Icon => {
  if (isIconLookup(icon)) {
    return icon;
  }

  if (Array.isArray(icon) && (icon as string[]).length === 2) {
    return { prefix: icon[0], iconName: icon[1] };
  }

  if (typeof icon === 'string') {
    const iconArray = icon.split(' ');
    if (iconArray.length === 1) {
      iconArray.unshift(IconDefaultPrefix);
    }
    return { prefix: iconArray[0] as IconPrefix, iconName: iconArray[1] as IconName };
  }

  throw new Error(`Invalid icon: ${JSON.stringify(icon)}`);
};

export const laClassList = (props: LaProps): string[] => {
  const classes = {
    'la-spin': props.spin,
    'la-pulse': props.pulse,
    'la-fw': props.fixedWidth,
    'la-border': props.border,
    'la-inverse': props.inverse,
    'la-layers-counter': props.counter,
    'la-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'la-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`la-${props.size}`]: props.size !== null,
    [`la-rotate-${props.rotate}`]: props.rotate !== null,
    [`la-pull-${props.pull}`]: props.pull !== null,
    [`la-stack-${props.stackItemSize}`]: props.stackItemSize != null
  };

  return Object.keys(classes)
    .map(key => (classes[key] ? key : null))
    .filter((key): key is string => key !== null);
};

export const applyCssTransforms = (transformObj: Transform = {}): string => {
  return (Object.keys(transformObj) as (keyof Transform)[])
    .map(key => {
      switch (key) {
        case 'size':
          return `scale(${1 + transformObj.size! / 10})`;
        case 'rotate':
          return `rotate(${transformObj.rotate}deg)`;
        case 'flipY':
          return transformObj.flipY ? `scaleY(-1)` : null;
        case 'flipX':
          return transformObj.flipX ? `scaleX(-1)` : null;
        case 'y':
          return `translateY(${transformObj.y}px)`;
        case 'x':
          return `translateX(${transformObj.x}px)`;
      }
    })
    .filter((value): value is string => value !== null)
    .join(' ');
};

export const parseTransformString = (transformString: string): Transform => {
  const transform: Required<Transform> = {
    size: 0,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };

  if (!transformString) {
    return transform;
  }

  return transformString
    .toLowerCase()
    .split(' ')
    .reduce((acc: Required<Transform>, n: string) => {
      const parts = n.toLowerCase().split('-');
      const first = parts[0];
      const restStr = parts.slice(1).join('-');

      if (first && restStr === 'h') {
        acc.flipX = true;
        return acc;
      }

      if (first && restStr === 'v') {
        acc.flipY = true;
        return acc;
      }

      const rest = parseFloat(restStr);

      if (isNaN(rest)) {
        return acc;
      }

      switch (first) {
        case 'grow':
          acc.size = acc.size + rest;
          break;

        case 'shrink':
          acc.size = acc.size - rest;
          break;

        case 'left':
          acc.x = acc.x - rest;
          break;

        case 'right':
          acc.x = acc.x + rest;
          break;

        case 'up':
          acc.y = acc.y - rest;
          break;

        case 'down':
          acc.y = acc.y + rest;
          break;

        case 'rotate':
          acc.rotate = acc.rotate + rest;
          break;
      }

      return acc;
    }, transform);
};
