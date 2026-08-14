import React, { forwardRef, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import {
  AriaPositionProps, FocusScope, FocusWithinProps, mergeProps,
  OverlayTriggerProps, PositionAria, useFocusRing, useFocusWithin,
  useOverlayPosition, useOverlayTrigger,
} from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import { FocusRingAria } from '@react-aria/focus';
import { FocusWithinResult, HoverProps, HoverResult, useHover } from '@react-aria/interactions';
import { OverlayTriggerState } from '@react-stately/overlays';

import { Box, PopoverContainer } from '../..';
import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { BadgeHelpHintProps } from '../../types';

interface BadgeHelpHintTriggerProps extends BadgeHelpHintProps {
  /** The hint content rendered inside the tooltip. */
  hint: React.ReactNode;
  /** The element that acts as the tooltip trigger. */
  children: ReactElement;
}

/**
 * Turns its single child into a help hint tooltip trigger, so no separate trigger element
 * is rendered next to it.
 */
const BadgeHelpHint = forwardRef<HTMLDivElement, BadgeHelpHintTriggerProps>((props, ref) => {
  const {
    align = 'middle',
    arrowCrossOffset,
    children,
    closeDelay,
    crossOffset,
    direction = 'top',
    hasNoArrow = false,
    hint,
    isDarkMode = true,
    isNotFlippable = false,
    offset = 15,
    popoverProps,
    width,
  } = props;

  const [isFocusWithinOverlay, setIsFocusWithinOverlay] = useState<boolean>(false);
  const { focusWithinProps }: FocusWithinResult = useFocusWithin({
    onFocusWithinChange: isFocusWithin => setIsFocusWithinOverlay(isFocusWithin),
  } as FocusWithinProps);

  const overlayRef = useRef<HTMLElement>(null);
  const triggerRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const { focusProps, isFocusVisible }: FocusRingAria = useFocusRing();

  const { hoverProps: overlayHoverProps, isHovered: isOverlayHovered } = useHover({});
  const { hoverProps, isHovered: isTriggerHovered }: HoverResult = useHover({} as HoverProps);

  const popoverState: OverlayTriggerState = useOverlayTriggerState({});
  const { open, close, isOpen } = popoverState;

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' } as OverlayTriggerProps,
    popoverState,
    triggerRef as RefObject<HTMLDivElement>,
  );

  // Set a timeout to close the overlay upon hover / focus loss,
  // but keep it open if the trigger or overlay are hovered again before it closes.
  useEffect(() => {
    let timeout;
    const isHovered = isTriggerHovered || isOverlayHovered;

    if (isHovered || isFocusWithinOverlay || isFocusVisible) {
      open();
    } else if (!isFocusWithinOverlay && !isFocusVisible && !isHovered) {
      timeout = setTimeout(close, closeDelay || 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [
    isFocusWithinOverlay,
    isFocusVisible,
    isOverlayHovered,
    isTriggerHovered,
    close,
    closeDelay,
    open,
  ]);

  const { overlayProps: positionProps, placement }: PositionAria = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: `${direction} ${align}`,
    offset,
    crossOffset,
    isOpen,
    onClose: close,
    shouldUpdatePosition: true,
    shouldFlip: !isNotFlippable,
  } as AriaPositionProps);

  const { classNames } = useStatusClasses(undefined, { isDarkMode });

  // The badge opens the hint on hover / focus, so the press handler
  // from useOverlayTrigger is unused.
  const triggerAriaProps = {
    'aria-controls': triggerProps['aria-controls'],
    'aria-haspopup': triggerProps['aria-haspopup'],
    'aria-expanded': isOpen,
  };

  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    tabIndex: 0,
    ...mergeProps(triggerAriaProps, focusProps, hoverProps),
  });

  return (
    <>
      {trigger}
      <PopoverContainer
        arrowCrossOffset={arrowCrossOffset}
        arrowProps={{ width: '8px', height: '4px' }}
        className={classNames}
        direction={direction}
        hasNoArrow={hasNoArrow}
        isDismissable={isFocusWithinOverlay ? !isOpen : true}
        isNonModal
        isOpen={isOpen}
        onClose={close}
        placement={placement ?? undefined}
        ref={overlayRef}
        width={width}
        {...mergeProps(
          overlayProps,
          positionProps,
          popoverProps || {},
          overlayHoverProps,
          focusWithinProps,
        )}
      >
        {/* Only autofocus if keyboard is being used */}
        <FocusScope restoreFocus autoFocus={isFocusVisible}>
          <Box variant="helpHint.popoverContainer" role="status" data-testid="badge-help-hint">
            {hint}
          </Box>
        </FocusScope>
      </PopoverContainer>
    </>
  );
});

export default BadgeHelpHint;
