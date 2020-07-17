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
export interface Styles {
  [key: string]: string;
}
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
  size?: SizeProp;
  fixedWidth?: boolean;
  rotate?: RotateProp;
  flip?: FlipProp;
  pull?: PullProp;
  spin?: boolean;
  pulse?: boolean;
  border?: boolean;
  counter?: boolean;
  inverse?: boolean;
  transform?: string | Transform;
  style?: Styles;
  stackItemSize?: '1x' | '2x';
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
  classes?: string[];
  attributes?: Attributes;
  styles?: Styles;
  transform?: Transform;
}

export interface Attributes {
  [key: string]: number | string;
}

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
    .filter(key => key);
};

export const applyCssTransforms = (transformObj: Transform): string => {
  const transformsHandlers = {
    size: (value: number) => `scale(${1 + value / 10})`,
    rotate: (value: number) => `rotate(${value}deg)`,
    flipY: (value: boolean) => (value ? `scaleY(-1)` : null),
    flipX: (value: boolean) => (value ? `scaleX(-1)` : null),
    y: (value: number) => `translateY(${value}px)`,
    x: (value: number) => `translateX(${value}px)`
  };

  return Object.keys(transformObj)
    .map(key => transformsHandlers[key](transformObj[key]))
    .filter(key => key)
    .join(' ');
};

export const parseTransformString = (transformString: string): Transform => {
  const transform = {
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
    .reduce((acc: Transform, n: any) => {
      const parts = n.toLowerCase().split('-');
      const first = parts[0];
      let rest = parts.slice(1).join('-');

      if (first && rest === 'h') {
        acc.flipX = true;
        return acc;
      }

      if (first && rest === 'v') {
        acc.flipY = true;
        return acc;
      }

      rest = parseFloat(rest);

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
