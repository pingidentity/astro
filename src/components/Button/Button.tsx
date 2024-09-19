import React, { forwardRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { Pressable, useHover, usePress } from '@react-aria/interactions';
import { Button as ThemeUIButton } from 'theme-ui';

import {
  useAriaLabelWarning,
  useLocalOrForwardRef,
  usePropWarning,
  useStatusClasses,
} from '../../hooks';
import { ButtonProps } from '../../types';
import { FocusEventHandler } from '../../types/shared';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import Loader from '../Loader';

const displayName = 'Button';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    isDisabled = false,
    isLoading,
    onBlur,
    onFocus,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onKeyDown,
    onKeyUp,
    onPress,
    onPressChange,
    onPressEnd,
    onPressStart,
    onPressUp,
    tabIndex,
    variant = 'default',
    ...others
  } = props;
  const buttonRef = useLocalOrForwardRef<HTMLButtonElement>(ref);

  usePropWarning(props, 'disabled', 'isDisabled');
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isPressed: isPressedFromContext } = usePress({ ref: buttonRef });

  const { buttonProps, isPressed } = useButton({
    elementType: 'button',
    isDisabled,
    onBlur: onBlur as FocusEventHandler,
    onFocus: onFocus as FocusEventHandler,
    onKeyDown,
    onKeyUp,
    onPress,
    onPressChange,
    onPressEnd,
    onPressStart,
    onPressUp,
    ...others,
  }, buttonRef);

  const { hoverProps, isHovered } = useHover({
    onHoverChange,
    onHoverEnd,
    onHoverStart,
  });

  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isFocused: isFocusVisible,
    isHovered,
    isPressed: isPressed || isPressedFromContext,
  });

  const ariaLabel = props['aria-label'];
  useAriaLabelWarning('Button', ariaLabel, variant === 'filter');

  return (
    <Pressable ref={buttonRef}>
      <ThemeUIButton
        aria-label={ariaLabel}
        className={classNames}
        role="button"
        sx={isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}}
        variant={variant}
        {...getPendoID(displayName)}
        {...others}
        {...mergeProps({ ...buttonProps, tabIndex }, hoverProps, focusProps)}
      >
        {isLoading ? <span style={{ visibility: 'hidden' }}>{children}</span> : children}
        {isLoading && <Loader size="0.5em" sx={{ position: 'absolute' }} />}
      </ThemeUIButton>
    </Pressable>
  );
});

Button.displayName = displayName;
export default Button;
