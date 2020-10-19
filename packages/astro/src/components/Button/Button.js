import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button as RButton } from 'rebass';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

const Button = forwardRef((props, ref) => {
  const {
    onPress,
    sx, // eslint-disable-line
    ...others
  } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const { buttonProps } = useButton(props, ref);
  const dynamicStyles = {
    '&:focus': {
      boxShadow: isFocusVisible ? 'focus' : 'none',
    },
  };

  return (
    <RButton
      ref={ref}
      {...mergeProps(others, focusProps, buttonProps)}
      sx={{ ...dynamicStyles, ...sx }}
    />
  );
});

Button.propTypes = {
  onPress: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'primary', 'text', 'success', 'critical', 'icon']),
};

Button.defaultProps = {
  variant: 'default',
};

export default Button;
