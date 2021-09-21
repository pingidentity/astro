import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { PressResponder } from '@react-aria/interactions';
import { useOverlayPosition } from '@react-aria/overlays';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';

import { useStatusClasses } from '../../hooks';
import { TooltipContext } from '../../context/TooltipContext/index';
import PopoverContainer from '../PopoverContainer';

/**
 * A `TooltipTrigger` is a composed component and must be comprised of two children: 1) a
 * focusable button, and 2) a `Tooltip` which renders non-interactive content. This component
 * is typically used as a design fallback for contextual information that may be hard to convey
 * otherwise. The tooltip trigger can also be disabled without disabling button press events.
 */
const TooltipTrigger = forwardRef((props, ref) => {
  const {
    children,
    crossOffset,
    isDisabled,
    align,
    direction,
    offset,
    trigger: triggerAction,
    className,
    isNotFlippable,
    isDarkMode,
    hasNoArrow,
  } = props;

  const [trigger, tooltip] = React.Children.toArray(children);

  const state = useTooltipTriggerState(props);

  const tooltipTriggerRef = useRef();
  const overlayRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => tooltipTriggerRef.current);

  const { triggerProps, tooltipProps } = useTooltipTrigger({
    isDisabled,
    trigger: triggerAction,
  }, state, tooltipTriggerRef);

  const { overlayProps: positionProps, arrowProps, placement } = useOverlayPosition({
    placement: `${direction} ${align}`,
    targetRef: tooltipTriggerRef,
    overlayRef,
    offset,
    // Our API preference is for default false so we invert this since it should be default true
    shouldFlip: !isNotFlippable,
    crossOffset,
    isOpen: state.isOpen,
  });

  const { classNames } = useStatusClasses(className, {
    [`is-${direction}`]: direction,
    isDarkMode,
  });

  const overlay = (
    <PopoverContainer
      isOpen={state.isOpen}
      ref={overlayRef}
      placement={placement}
      arrowProps={arrowProps}
      className={classNames}
      hasNoArrow={hasNoArrow}
      {...positionProps}
      {...tooltipProps}
    >
      {tooltip}
    </PopoverContainer>
  );

  return (
    <>
      <PressResponder {...triggerProps} ref={tooltipTriggerRef}>
        {trigger}
      </PressResponder>
      <TooltipContext.Provider value={{ state }}>
        {overlay}
      </TooltipContext.Provider>
    </>
  );
});

TooltipTrigger.propTypes = {
  /** Alignment of the popover menu relative to the trigger. */
  align: PropTypes.oneOf(['start', 'end', 'middle']),
  /** The additional offset applied along the cross axis
   * between the element and its anchor element. */
  crossOffset: PropTypes.number,
  /** Amount of time before the tooltip shows */
  delay: PropTypes.number,
  /** Where the popover menu opens relative to its trigger. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Whether or not the tooltip is disabled. */
  isDisabled: PropTypes.bool,
  /** Defaults to true, displays dark tooltip with white text */
  isDarkMode: PropTypes.bool,
  /** Whether the overlay is open by default (controlled). */
  isOpen: PropTypes.bool,
  /** Whether the overlay is open by default (uncontrolled). */
  isDefaultOpen: PropTypes.bool,
  /**
     * Whether the popover is prevented from flipping directions when insufficient space is
     * available for the given `direction` placement.
     */
  isNotFlippable: PropTypes.bool,
  /**
   * Allows to add an arrow to popover container
   */
  hasNoArrow: PropTypes.bool,
  /** Tooltip offset relative to its trigger. */
  offset: PropTypes.number,
  /** The placement of the element with respect to its anchor element. */
  placement: PropTypes.string,
  /** By default, opens for both focus and hover. Can be made to open only for focus. */
  trigger: PropTypes.string,
};

TooltipTrigger.defaultProps = {
  align: 'middle',
  crossOffset: 0,
  delay: 0,
  direction: 'bottom',
  isNotFlippable: false,
  isDarkMode: true,
  hasNoArrow: false,
  offset: 10,
};

export default TooltipTrigger;
