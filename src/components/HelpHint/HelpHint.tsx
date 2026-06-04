import React, { forwardRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import {
  AriaPositionProps, FocusScope, FocusWithinProps, mergeProps,
  OverlayTriggerProps, PositionAria, useFocusRing, useFocusWithin,
  useOverlayPosition, useOverlayTrigger,
} from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import { FocusRingAria } from '@react-aria/focus';
import { FocusWithinResult, HoverProps, HoverResult, useHover } from '@react-aria/interactions';
import { OverlayTriggerState } from '@react-stately/overlays';

import { Box, Icon, IconButton, PopoverContainer } from '../..';
import { useGetTheme, useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { isSafari } from '../../styles/safariAgent';
import { HelpHintProps } from '../../types';

const HelpHint = forwardRef<HTMLButtonElement, HelpHintProps>((props, ref) => {
  const {
    align,
    arrowCrossOffset,
    children,
    className,
    closeDelay,
    direction,
    hasNoArrow,
    iconButtonProps,
    isDarkMode,
    isNotFlippable,
    popoverProps,
    tooltipProps,
    ...others
  } = props;

  const { icons } = useGetTheme();

  const [isFocusWithinOverlay, setIsFocusWithinOverlay] = useState<boolean>(false);
  const { focusWithinProps }: FocusWithinResult = useFocusWithin({
    onFocusWithinChange: isFocusWithin => setIsFocusWithinOverlay(isFocusWithin),
  } as FocusWithinProps);

  const overlayRef = useRef<HTMLElement>(null);
  const triggerRef = useLocalOrForwardRef<HTMLButtonElement>(ref);

  const { focusProps, isFocusVisible }: FocusRingAria = useFocusRing();

  const { hoverProps: overlayHoverProps, isHovered: isOverlayHovered } = useHover({});
  const { hoverProps, isHovered: isTriggerHovered }: HoverResult = useHover({} as HoverProps);

  const popoverState: OverlayTriggerState = useOverlayTriggerState({});

  const { open, close, isOpen } = popoverState;

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' } as OverlayTriggerProps,
    popoverState as OverlayTriggerState,
    triggerRef as RefObject<HTMLButtonElement>,

  );

  // Set a timeout to close the overlay upon hover / focus loss,
  // but keep it open if the trigger or overlay are hovered again before it closes.
  useEffect(() => {
    let timeout;
    const isHovered = isTriggerHovered || isOverlayHovered;

    if (isHovered || isFocusWithinOverlay) {
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

  useEffect(() => {
    if (isOpen) {
      return triggerRef?.current.setAttribute('aria-expanded', 'true');
    }
    return triggerRef?.current.setAttribute('aria-expanded', 'false');
  }, [isOpen, triggerRef]);

  const { overlayProps: positionProps, placement }: PositionAria = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: `${direction} ${align}`,
    offset: 15,
    isOpen,
    onClose: close,
    shouldUpdatePosition: true,
    shouldFlip: !isNotFlippable,
  } as AriaPositionProps);

  const { classNames } = useStatusClasses(className, {
    isDarkMode,
  });

  const addIsSafariCompatiblePropToLinkChildren = (element: ReactNode) => {
    if (element) {
      return React.Children.map(element, (child: ReactNode) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<HelpHintProps>, {
          children: addIsSafariCompatiblePropToLinkChildren(child.props.children),
          isSafariCompatible: typeof (child as React.ReactElement).type === 'string'
            && (child as React.ReactElement).type === 'Link',
        });
      });
    }
    return undefined;
  };

  return (
    <Box {...others} ref={ref}>
      <IconButton
        ref={triggerRef}
        aria-label="label help hint"
        data-testid="help-hint__button"
        variant="hintButton"
        {...mergeProps(triggerProps, iconButtonProps, focusProps, hoverProps)}
      >
        <Icon icon={icons.helpHint} />
      </IconButton>
      <PopoverContainer
        arrowCrossOffset={arrowCrossOffset}
        arrowProps={{ width: '8px', height: '4px' }}
        className={classNames}
        direction={direction}
        hasNoArrow={hasNoArrow}
        isDismissable={isFocusWithinOverlay ? !isOpen : true}
        isNonModal
        onClose={close}
        placement={placement ?? undefined}
        ref={overlayRef}
        isOpen={isOpen}
        {...mergeProps(
          overlayProps,
          positionProps,
          popoverProps || tooltipProps,
          overlayHoverProps,
          focusWithinProps,
        )}
      >
        {/* Only autofocus if keyboard is being used */}
        <FocusScope restoreFocus autoFocus={isFocusVisible}>
          <Box variant="helpHint.popoverContainer" role="status">
            {isSafari ? addIsSafariCompatiblePropToLinkChildren(children) : children}
          </Box>
        </FocusScope>
      </PopoverContainer>
    </Box>
  );
});

HelpHint.defaultProps = {
  align: 'middle',
  direction: 'top',
  hasNoArrow: false,
  isDarkMode: true,
  isNotFlippable: false,
};

export default HelpHint;
