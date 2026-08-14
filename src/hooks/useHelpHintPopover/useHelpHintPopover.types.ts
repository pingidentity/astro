import { RefObject } from 'react';

import { Axis, DOMAttributes, PopoverContainerProps } from '../../types';

export interface UseHelpHintPopoverOptions {
  /** Alignment of the popover relative to the trigger. */
  align?: 'start' | 'end' | 'middle';
  /** Class name applied to the popover, alongside the theme status classes. */
  className?: string;
  /** Amount of time before the popover closes. */
  closeDelay?: number;
  /** The additional offset applied along the cross axis between the popover and the trigger. */
  crossOffset?: number;
  /** Where the popover opens relative to its trigger. */
  direction?: Axis;
  /** Defaults to true, displays dark popover with white text. */
  isDarkMode?: boolean;
  /**
    * Whether the popover is prevented from flipping directions when insufficient space is
    * available for the given `direction` placement.
  */
  isNotFlippable?: boolean;
  /**
    * Whether the trigger element handles react-aria press events. Elements that do not, such as a
    * plain div, open the popover on hover / focus only.
  */
  isTriggerPressable?: boolean;
  /** Popover offset relative to its trigger. */
  offset?: number;
  /**
    * Whether keyboard focus on the trigger opens the popover. Needed by triggers that have no
    * press affordance of their own.
  */
  shouldOpenOnTriggerFocus?: boolean;
}

export interface UseHelpHintPopoverResult {
  /** Closes the popover. */
  close: () => void;
  /** Whether the trigger is focused via keyboard. */
  isFocusVisible: boolean;
  /** Whether the popover is open. */
  isOpen: boolean;
  /** Opens the popover. */
  open: () => void;
  /** Ref to attach to the popover element. */
  overlayRef: RefObject<HTMLElement>;
  /** Props to spread onto the popover element. */
  popoverContainerProps: PopoverContainerProps;
  /** Props to spread onto the trigger element. */
  triggerProps: DOMAttributes;
}
