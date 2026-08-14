import React, { forwardRef, ReactNode, useEffect } from 'react';
import { FocusScope, mergeProps } from 'react-aria';

import { Box, Icon, IconButton, PopoverContainer } from '../..';
import { useGetTheme, useHelpHintPopover, useLocalOrForwardRef } from '../../hooks';
import { isSafari } from '../../styles/safariAgent';
import { HelpHintProps } from '../../types';

const HelpHint = forwardRef<HTMLButtonElement, HelpHintProps>((props, ref) => {
  const {
    align,
    arrowCrossOffset,
    children,
    className,
    closeDelay,
    crossOffset,
    direction,
    hasNoArrow,
    iconButtonProps,
    isDarkMode,
    isNotFlippable,
    offset,
    popoverProps,
    tooltipProps,
    ...others
  } = props;

  const { icons } = useGetTheme();

  const triggerRef = useLocalOrForwardRef<HTMLButtonElement>(ref);

  const {
    isFocusVisible,
    isOpen,
    overlayRef,
    popoverContainerProps,
    triggerProps,
  } = useHelpHintPopover<HTMLButtonElement>(triggerRef, {
    align,
    className,
    closeDelay,
    crossOffset,
    direction,
    isDarkMode,
    isNotFlippable,
    offset,
  });

  useEffect(() => {
    triggerRef?.current.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }, [isOpen, triggerRef]);

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
        {...mergeProps(triggerProps, iconButtonProps || {})}
      >
        <Icon icon={icons.helpHint} />
      </IconButton>
      <PopoverContainer
        {...mergeProps(popoverContainerProps, popoverProps || tooltipProps || {})}
        arrowCrossOffset={arrowCrossOffset}
        arrowProps={{ width: '8px', height: '4px' }}
        hasNoArrow={hasNoArrow}
        ref={overlayRef}
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
