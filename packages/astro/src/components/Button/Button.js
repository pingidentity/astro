import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button as RButton } from 'rebass';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import useStatusClasses from '../../hooks/useStatusClasses';
import Loader from '../Loader';

const Button = forwardRef((props, ref) => {
  const {
    className,
    isDisabled,
    isLoading,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    children,
    ...others
  } = props;
  const buttonRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { buttonProps, isPressed } = useButton(props, buttonRef);
  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed,
    isFocused: isFocusVisible,
    isDisabled,
  });

  return (
    <RButton
      ref={buttonRef}
      className={classNames}
      {...others}
      {...mergeProps(hoverProps, focusProps, buttonProps)}
    >
      {isLoading ? <span style={{ visibility: 'hidden' }}>{children}</span> : children}
      {isLoading && <Loader size="0.5em" sx={{ position: 'absolute' }} /> }
    </RButton>
  );
});

Button.propTypes = {
  /** Whether the button is disabled. */
  isDisabled: PropTypes.bool,
  /** Shows loader instead of children */
  isLoading: PropTypes.bool,
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
  variant: PropTypes.oneOf(['default', 'primary', 'text', 'success', 'critical', 'icon', 'inline', 'forms.select', 'rocker']),
};

Button.defaultProps = {
  isDisabled: false,
  variant: 'default',
};

Button.displayName = 'Button';
export default Button;
