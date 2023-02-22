import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { Pressable, useHover } from '@react-aria/interactions';
import PropTypes from 'prop-types';
import { Button as ThemeUIButton } from 'theme-ui';

import { useAriaLabelWarning, usePropWarning, useStatusClasses } from '../../hooks';
import Loader from '../Loader';

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
  const { buttonProps, isPressed } = useButton({
    elementType: 'button',
    ...props,
  }, buttonRef);
  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed,
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

Button.propTypes = {
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Whether the button is disabled. */
  isDisabled: PropTypes.bool,
  /** Shows loader instead of children */
  isLoading: PropTypes.bool,
  /**
   * Handler that is called when a hover interaction starts.
   * (e: HoverEvent) => void
   */
  onHoverStart: PropTypes.func,
  /**
   * Handler that is called when a hover interaction ends.
   * (e: HoverEvent) => void
   */
  onHoverEnd: PropTypes.func,
  /**
   * Handler that is called when the hover state changes.
   * (isHovering: boolean) => void
   */
  onHoverChange: PropTypes.func,
  /**
   * Handler that is called when the press is released over the target.
   * (e: PressEvent) => void
   */
  onPress: PropTypes.func,
  /**
   * Handler that is called when a press interaction starts.
   * (e: PressEvent) => void
   */
  onPressStart: PropTypes.func,
  /**
   * Handler that is called when a press interaction ends, either over the target or when the
   * pointer leaves the target.
   * (e: PressEvent) => void
   */
  onPressEnd: PropTypes.func,
  /**
   * Handler that is called when the press state changes.
   * (isPressed: boolean) => void
   */
  onPressChange: PropTypes.func,
  /**
   * Handler that is called when a press is released over the target, regardless of whether it
   * started on the target or not.
   * (e: PressEvent) => void
   */
  onPressUp: PropTypes.func,
  /** The styling variation of the button. */
  variant: PropTypes.string,
  /** The focus variation of the button. */
  tabIndex: PropTypes.number,
};

Button.defaultProps = {
  isDisabled: false,
  variant: 'default',
};

Button.displayName = 'Button';
export default Button;
