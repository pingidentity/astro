import { RefObject, useEffect, useRef, useState } from 'react';
import {
  AriaPositionProps, FocusWithinProps, mergeProps, OverlayTriggerProps,
  PositionAria, useFocusRing, useFocusWithin, useOverlayPosition, useOverlayTrigger,
} from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import { FocusRingAria } from '@react-aria/focus';
import { FocusWithinResult, HoverProps, HoverResult, useHover } from '@react-aria/interactions';
import { OverlayTriggerState } from '@react-stately/overlays';

import { Axis, DOMAttributes, PopoverContainerProps } from '../../types';
import useStatusClasses from '../useStatusClasses';

export interface UseHelpHintPopoverOptions {
  align?: 'start' | 'end' | 'middle';
  className?: string;
  closeDelay?: number;
  crossOffset?: number;
  direction?: Axis;
  isDarkMode?: boolean;
  isNotFlippable?: boolean;
  isTriggerPressable?: boolean;
  offset?: number;
  shouldOpenOnTriggerFocus?: boolean;
}

export interface UseHelpHintPopoverResult {
  close: () => void;
  isFocusVisible: boolean;
  isOpen: boolean;
  open: () => void;
  overlayRef: RefObject<HTMLElement>;
  popoverContainerProps: PopoverContainerProps;
  triggerProps: DOMAttributes;
}

const useHelpHintPopover = <T extends HTMLElement>(
  triggerRef: RefObject<T>,
  options: UseHelpHintPopoverOptions = {},
): UseHelpHintPopoverResult => {
  const {
    align = 'middle',
    className,
    closeDelay,
    crossOffset,
    direction = 'top',
    isDarkMode = true,
    isNotFlippable = false,
    isTriggerPressable = true,
    offset = 15,
    shouldOpenOnTriggerFocus = false,
  } = options;

  const [isFocusWithinOverlay, setIsFocusWithinOverlay] = useState<boolean>(false);
  const { focusWithinProps }: FocusWithinResult = useFocusWithin({
    onFocusWithinChange: isFocusWithin => setIsFocusWithinOverlay(isFocusWithin),
  } as FocusWithinProps);

  const overlayRef = useRef<HTMLElement>(null);

  const { focusProps, isFocusVisible }: FocusRingAria = useFocusRing();

  const { hoverProps: overlayHoverProps, isHovered: isOverlayHovered } = useHover({});
  const { hoverProps, isHovered: isTriggerHovered }: HoverResult = useHover({} as HoverProps);

  const popoverState: OverlayTriggerState = useOverlayTriggerState({});
  const { open, close, isOpen } = popoverState;

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' } as OverlayTriggerProps,
    popoverState,
    triggerRef,
  );

  useEffect(() => {
    let timeout;
    const isHovered = isTriggerHovered || isOverlayHovered;

    if (isHovered || isFocusWithinOverlay || (shouldOpenOnTriggerFocus && isFocusVisible)) {
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
    shouldOpenOnTriggerFocus,
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

  const { classNames } = useStatusClasses(className, { isDarkMode });

  const { onPress, ...pressFreeTriggerProps } = triggerProps;

  return {
    close,
    isFocusVisible,
    isOpen,
    open,
    overlayRef,
    triggerProps: mergeProps(
      isTriggerPressable ? triggerProps : pressFreeTriggerProps,
      focusProps,
      hoverProps,
    ),
    popoverContainerProps: {
      className: classNames,
      direction,
      isDismissable: isFocusWithinOverlay ? !isOpen : true,
      isNonModal: true,
      isOpen,
      onClose: close,
      placement: placement ?? undefined,
      ...mergeProps(overlayProps, positionProps, overlayHoverProps, focusWithinProps),
    },
  };
};

export default useHelpHintPopover;
