import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFocusRing } from '@react-aria/focus';
import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';

const Panel = forwardRef((props, ref) => {
  const {
    className,
    children,
    isVisible,
    sx, // eslint-disable-line
    width,
  } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
    isVisible,
  });
  const dynamicStyles = {
    marginRight: isVisible ? 0 : `-${width}`,
  };

  return (
    <Box
      className={classNames}
      ref={ref}
      tabIndex={isVisible ? 0 : -1}
      variant="boxes.panel"
      {...props}
      {...focusProps}
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
