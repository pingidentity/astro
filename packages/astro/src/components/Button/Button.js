import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button as RButton } from 'rebass';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import useStatusClasses from '../../hooks/useStatusClasses';

const Button = forwardRef((props, ref) => {
  const {
    className,
    isDisabled,
    onPress,
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
    />
  );
});

Button.propTypes = {
  /** Whether the button is disabled. */
  isDisabled: PropTypes.bool,
  /** Handler that is fired when the button is pressed via mouse click or touch event. */
  onPress: PropTypes.func,
  /** The styling variation of the button. */
  variant: PropTypes.oneOf(['default', 'primary', 'text', 'success', 'critical', 'icon', 'inline']),
};

Button.defaultProps = {
  isDisabled: false,
  variant: 'default',
};

Button.displayName = 'Button';
export default Button;
