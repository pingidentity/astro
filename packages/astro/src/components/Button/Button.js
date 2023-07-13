import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { Pressable, useHover, usePress } from '@react-aria/interactions';
import { Button as ThemeUIButton } from 'theme-ui';

import { useAriaLabelWarning, usePropWarning, useStatusClasses } from '../../hooks';
import Loader from '../Loader';

import { buttonPropTypes } from './buttonAttributes';

const Button = forwardRef((props, ref) => {
  const {
    className,
    isDisabled,
    isLoading,
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    children,
    variant,
    tabIndex,
    ...others
  } = props;
  const buttonRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { isPressed: isPressedFromContext } = usePress(buttonRef);
  const { buttonProps, isPressed } = useButton({
    elementType: 'button',
    ...props,
  }, buttonRef);
  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed: isPressed || isPressedFromContext,
    isFocused: isFocusVisible,
    isDisabled,
  });

  const ariaLabel = props['aria-label'];
  useAriaLabelWarning('Button', ariaLabel, variant === 'filter');

  return (
    <Pressable ref={buttonRef}>
      <ThemeUIButton
        aria-label={ariaLabel}
        className={classNames}
        role="button"
        tx="buttons"
        sx={isLoading && { display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        variant={variant}
        {...others}
        {...mergeProps({ ...buttonProps, tabIndex }, hoverProps, focusProps)}
      >
        {isLoading ? <span style={{ visibility: 'hidden' }}>{children}</span> : children}
        {isLoading && <Loader size="0.5em" sx={{ position: 'absolute' }} />}
      </ThemeUIButton>
    </Pressable>
  );
});

Button.propTypes = buttonPropTypes;

Button.defaultProps = {
  isDisabled: false,
  variant: 'default',
};

Button.displayName = 'Button';
export default Button;
