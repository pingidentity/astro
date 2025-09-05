import { BoxProps } from './box';
import { DOMAttributes, HoverProps, PressProps } from './shared';

export interface CardProps
  extends Omit<PressProps, 'onClick'>,
    PressProps,
    HoverProps,
    BoxProps,
    DOMAttributes {
  tabIndex?: number | string;
  isInteractiveWithin?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
