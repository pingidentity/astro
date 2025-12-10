import { OverlayTriggerState } from 'react-stately';
import { ThemeUICSSObject } from 'theme-ui';

import { UseOverlayPanelStateReturnOnClose } from '../hooks/useOverlayPanelState/useOverlayPanelState';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { PanelSize } from './shared';

export interface OverlayPanelState extends OverlayTriggerState {
  isTransitioning?: boolean
}


export interface OverlayPanelProps extends BoxProps, TestingAttributes {
  /** Sets the open state of the menu. */
  isOpen?: boolean,
  /** Sets the size of the overlay panel. */
  size?: PanelSize,
  /** Callback function that runs when the esc key is used to close the OverlayPanel. */
  onClose?: UseOverlayPanelStateReturnOnClose;
  /** Boolean that determines whether or not the css transition is occuring. */
  isTransitioning?: boolean,
  /** Ref that is connected to the button that triggers the overlay state.
   Focus will return to this ref when the keyboard is used to close the OverlayPanel. */
  triggerRef?: React.RefObject<HTMLButtonElement>,
  /** Inline styling prop for item */
  sx?: ThemeUICSSObject
  state?: OverlayPanelState;
}
