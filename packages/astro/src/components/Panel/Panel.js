import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import Box from '../Box';

const Panel = forwardRef((props, ref) => {
  const {
    children,
    isVisible,
    sx, // eslint-disable-line
    width,
  } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const dynamicStyles = {
    marginRight: isVisible ? 0 : `-${width}`,
    visibility: isVisible ? 'visible' : 'hidden',
    '&:focus': {
      boxShadow: isFocusVisible ? 'focus' : 'none',
    },
  };

  return (
    <Box
      ref={ref}
      tabIndex={isVisible ? 0 : -1}
      variant="boxes.panel"
      {...mergeProps(props, focusProps)}
      sx={{ ...dynamicStyles, ...sx }}
    >
      {isVisible && children}
    </Box>
  );
});

Panel.propTypes = {
  isVisible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Panel.defaultProps = {
  width: '100%',
};

Panel.displayName = 'Panel';

export default Panel;
