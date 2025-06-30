import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useOverlayPosition, useTooltipTrigger } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';
import { PressResponder } from '@react-aria/interactions';

import { TooltipContext } from '../../context/TooltipContext/index';
import { useGetTheme, useMountTransition, usePropWarning, useStatusClasses } from '../../hooks';
import { DOMAttributes, FocusableElement, Placement, PopoverArrowProps, TooltipTriggerProps } from '../../types';
import PopoverContainer from '../PopoverContainer';

const TooltipTrigger = forwardRef<FocusableElement, TooltipTriggerProps>(
  (props, ref) => {
    const {
      arrowCrossOffset,
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
      targetRef,
      width,
      shouldAnimate = true,
    } = props;

    const [trigger, tooltip] = React.Children.toArray(children);

    const state = useTooltipTriggerState(props);

    const tooltipTriggerRef = useRef<FocusableElement>(null);
    const overlayRef = useRef<HTMLElement>(null);

    const tooltipRef = targetRef || tooltipTriggerRef;

    usePropWarning(props, 'disabled', 'isDisabled');
    /* istanbul ignore next */
    useImperativeHandle<
      HTMLElement | FocusableElement | null, HTMLElement | FocusableElement | null
    >(ref, () => tooltipRef.current);

    const { triggerProps, tooltipProps } = useTooltipTrigger({
      isDisabled,
      trigger: triggerAction,
    }, state, tooltipRef);

    const { themeState } = useGetTheme();

    const isTransitioning = useMountTransition(state.isOpen, 200);

    const isOpen = state.isOpen || (themeState.isOnyx && shouldAnimate && isTransitioning);

    const { overlayProps: positionProps, arrowProps, placement } = useOverlayPosition({
      placement: `${direction} ${align}` as Placement,
      targetRef: tooltipRef,
      overlayRef,
      offset,
      // Our API preference is for default false so we invert this since it should be default true
      shouldFlip: !isNotFlippable,
      crossOffset,
      isOpen,
    });

    const { classNames } = useStatusClasses(className, {
      [`is-${direction}`]: direction,
      isDarkMode,
      animate: shouldAnimate,
      isTransitioning,
      isMounted: state.isOpen,
    });

    const overlay = (
      <PopoverContainer
        isOpen={isOpen}
        ref={overlayRef}
        placement={placement}
        arrowProps={arrowProps as PopoverArrowProps}
        className={classNames}
        hasNoArrow={hasNoArrow}
        arrowCrossOffset={arrowCrossOffset}
        width={width}
        direction={direction}
        isNonModal
        {...tooltipProps as DOMAttributes}
        {...positionProps as DOMAttributes}
      >
        {tooltip}
      </PopoverContainer>
    );

    return (
      <>
        <PressResponder {...triggerProps} ref={tooltipTriggerRef}>
          {trigger}
        </PressResponder>
        <TooltipContext.Provider value={state}>
          {overlay}
        </TooltipContext.Provider>
      </>
    );
  });

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
