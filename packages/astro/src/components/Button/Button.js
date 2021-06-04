import React, { forwardRef, useRef, useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button as RButton } from 'rebass';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { modes } from './constants';
import useStatusClasses from '../../hooks/useStatusClasses';
import useDeprecationWarning from '../../hooks/useDeprecationWarning';
import Loader from '../Loader';
import Box from '../Box';

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
    mode,
    ...others
  } = props;
  const buttonRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const ButtonBase = useMemo(() => (mode === modes.ICON ? Box : RButton), [mode]);
  const elementType = useMemo(() => {
    if (mode === modes.ICON) return 'div';
    return 'button';
  }, [mode]);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { buttonProps, isPressed } = useButton({
    elementType,
    ...props,
  }, buttonRef);
  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed,
    isFocused: isFocusVisible,
    isDisabled,
  });

  if (props.variant === 'icon') {
    useDeprecationWarning('The "icon" variant for `Button` will be deprecated in Astro-UI 1.0.0, use the `IconButton` component instead.');
  }

  return (
    <ButtonBase
      ref={buttonRef}
      className={classNames}
      role="button"
      tx="buttons"
      {...others}
      {...mergeProps(hoverProps, focusProps, buttonProps)}
    >
      {isLoading ? <span style={{ visibility: 'hidden' }}>{children}</span> : children}
      {isLoading && <Loader size="0.5em" sx={{ position: 'absolute' }} /> }
    </ButtonBase>
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
  variant: PropTypes.string,
  /** The behavioral pattern to apply to the button. */
  mode: PropTypes.oneOf(['default', 'icon']),
};

Button.defaultProps = {
  isDisabled: false,
  variant: 'default',
  mode: 'default',
};

Button.displayName = 'Button';
export default Button;
