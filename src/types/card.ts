import { BoxProps } from './box';
import { DOMAttributes, HoverProps, PressProps } from './shared';

export interface CardProps extends
  PressProps,
  HoverProps,
  BoxProps,
  DOMAttributes {
    tabIndex?: number | string,
    isInteractiveWithin? : boolean;
  }
