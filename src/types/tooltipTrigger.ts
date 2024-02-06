import { RefObject } from 'react';
import { TooltipTriggerProps as ReactAriaTooltipTriggerProps } from 'react-aria';

import { DOMAttributes, FocusableElement, StyleProps } from './shared';

export interface TooltipProps extends StyleProps, DOMAttributes { }

export interface TooltipTriggerProps extends DOMAttributes, ReactAriaTooltipTriggerProps {
  /** Alignment of the Tooltip relative to the trigger. */
  align?: 'start' | 'end' | 'middle';

  /** The additional offset applied along the cross axis
   * between the element and its anchor element.
   */
  crossOffset?: number;

  /** Where the Tooltip opens relative to its trigger. */
  direction?: 'top' | 'right' | 'bottom' | 'left';

  /** Defaults to true; displays dark tooltip with white text */
  isDarkMode?: boolean;

  /** Whether the overlay is open by default (uncontrolled). */
  isDefaultOpen?: boolean;

  /**
   * Whether the Tooltip is prevented from flipping directions when insufficient space is
   * available for the given `direction` placement.
   */
  isNotFlippable?: boolean;

  /**
   * Allows to add an arrow to Tooltip container
   */
  hasNoArrow?: boolean;

  /** Tooltip offset relative to its trigger. */
  offset?: number;

  /** Arrow offset relative to the left of the tooltip.
   * Must be passed as a px or percentage.
   */
  arrowCrossOffset?: string;

  /** The placement of the element with respect to its anchor element. */
  placement?: string;

  /** Width applied to the wrapper of the tooltip component. */
  width?: string;

  /* The ref for the element which the overlay positions itself with respect to. */
  targetRef?: RefObject<FocusableElement | HTMLElement>;
}
