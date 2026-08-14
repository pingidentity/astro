import React, { forwardRef, ReactElement } from 'react';
import { FocusScope, mergeProps } from 'react-aria';

import { Box, PopoverContainer } from '../..';
import { useHelpHintPopover, useLocalOrForwardRef } from '../../hooks';
import { BadgeHelpHintProps } from '../../types';

interface BadgeHelpHintTriggerProps extends BadgeHelpHintProps {
  hint: string;
  children: ReactElement;
}

const BadgeHelpHint = forwardRef<HTMLDivElement, BadgeHelpHintTriggerProps>((props, ref) => {
  const {
    align,
    arrowCrossOffset,
    children,
    closeDelay,
    crossOffset,
    direction = 'top',
    hasNoArrow = false,
    hint,
    isDarkMode,
    isNotFlippable,
    offset,
    popoverProps,
    width,
  } = props;

  const triggerRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const {
    isFocusVisible,
    isOpen,
    overlayRef,
    popoverContainerProps,
    triggerProps,
  } = useHelpHintPopover<HTMLDivElement>(triggerRef, {
    align,
    closeDelay,
    crossOffset,
    direction,
    isDarkMode,
    isNotFlippable,
    isTriggerPressable: false,
    offset,
    shouldOpenOnTriggerFocus: true,
  });

  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    tabIndex: 0,
    'aria-expanded': isOpen,
    ...triggerProps,
  });

  return (
    <>
      {trigger}
      <PopoverContainer
        {...mergeProps(popoverContainerProps, popoverProps || {})}
        arrowCrossOffset={arrowCrossOffset}
        arrowProps={{ width: '8px', height: '4px' }}
        hasNoArrow={hasNoArrow}
        ref={overlayRef}
        width={width}
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
