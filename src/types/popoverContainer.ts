import { DOMAttributes, Modify, StyleProps } from './shared';

type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

type StylePropsExtended = Modify<StyleProps, { direction?: PopoverPlacement }>

export interface PopoverArrowProps extends DOMAttributes, StylePropsExtended {
  arrowCrossOffset?: string,
}

export interface PopoverContainerProps extends StylePropsExtended, DOMAttributes {
  placement?: string,
  arrowProps?: PopoverArrowProps,
  arrowCrossOffset?: string,
  onClose? (): unknown,
  isNotClosedOnBlur?: boolean,
  hasNoArrow?: boolean,
  isKeyboardDismissDisabled?: boolean,
  isNonModal?: boolean,
  isDismissable?: boolean,
}

export interface PopoverWrapperProps extends PopoverContainerProps {
  isOpen?: boolean,
}
