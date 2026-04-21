import type { OverlayTriggerState } from 'react-stately';
import type { AriaPopoverProps, Placement } from '@react-aria/overlays';

import { TestingAttributes } from './shared/test';
import { DOMAttributes, Modify, StyleProps } from './shared';

type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

type StylePropsExtended = Modify<StyleProps, { direction?: PopoverPlacement }>

export interface PopoverArrowProps extends DOMAttributes, StylePropsExtended {
  arrowCrossOffset?: string,
}

export interface PopoverContainerProps extends StylePropsExtended, DOMAttributes,
TestingAttributes {
  placement?: string,
  arrowProps?: PopoverArrowProps,
  arrowCrossOffset?: string,
  onClose? (): unknown,
  isNotClosedOnBlur?: boolean,
  hasNoArrow?: boolean,
  isKeyboardDismissDisabled?: boolean,
  isNonModal?: boolean,
  isDismissable?: boolean,
  isOpen?: boolean,
}

export interface PopoverWrapperProps extends PopoverContainerProps {
  isOpen?: boolean,
}

export interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children?: React.ReactNode;
  state: OverlayTriggerState;
  direction?: PopoverPlacement
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  width?: string | number;
  'data-testid'?: string;
  hasNoArrow?: boolean;
  arrowProps?: PopoverArrowProps,
  arrowCrossOffset?: string,
  isDismissable?: boolean,
  role?: string,
  isNotClosedOnBlur?: boolean,
}
