import { ReactNode } from 'react';

import { DOMAttributes } from './shared/dom';
import { TestingAttributes } from './shared/test';
import { IconButtonProps } from './iconButton';
import { PopoverContainerProps } from './popoverContainer';
import { Axis } from './shared';
import { TooltipProps } from './tooltipTrigger';

interface TooltipWrapperProps extends TooltipProps {
  isOpen?: boolean;
}

export interface HelpHintProps extends DOMAttributes, TestingAttributes {
  /** Props object that is spread directly into the popover element. */
  popoverProps?: PopoverContainerProps;
  /** @ignore Alias for `popoverProps` prop. Exists for backwards-compatibility. */
  tooltipProps?: TooltipWrapperProps;
  /** Props object that is spread directly into the IconButton element. */
  iconButtonProps?: IconButtonProps;
  /** Defaults to true, displays dark popover with white text */
  isDarkMode?: boolean;
  /** Where the popover menu opens relative to its trigger. */
  direction?: Axis;
  /**
    * Whether the popover is prevented from flipping directions when insufficient space is
    * available for the given `direction` placement.
  */
  isNotFlippable?: boolean;
  /** Alignment of the popover menu relative to the trigger. */
  align?: 'start' | 'end' | 'middle';
  /**
    * Allows to add an arrow to popover container
  */
  hasNoArrow?: boolean;
  /** Popover offset relative to its trigger. */
  offset?: number;
  /** Arrow offset relative to the left of the popover.
  * Must be passed as a px or percentage. */
  arrowCrossOffset?: string;
  /** The additional offset applied along the cross axis
  * between the element and its anchor element. */
  crossOffset?: number;
  /** Amount of time before the popover closes */
  closeDelay?: number;
  /** Children node */
  children?: ReactNode;
  /** Safari compatible flag */
  isSafariCompatible?: boolean;
  width?: string | number;
}
