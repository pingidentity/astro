import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import useStatusClasses from '../../hooks/useStatusClasses';

const ScrollBox = forwardRef((props, ref) => {
  const {
    maxHeight,
    children,
    sx, // eslint-disable-line
    className,
    hasShadows,
    onScroll,
    ...others
  } = props;

  const { classNames } = useStatusClasses('',
    {
      hasShadows,
    },
  );

  return (
    <Box
      ref={ref}
      sx={{
        maxHeight,
        overflowY: 'auto',
        ...sx,
      }}
      onScroll={onScroll}
      variant="boxes.scrollbox"
      {...others}
      className={classNames}
    >
      {children}
    </Box>
  );
});

ScrollBox.defaultProps = {
  maxHeight: '100%',
  hasShadows: false,
};

ScrollBox.propTypes = {
  /** Height at which the content within ScrollBox will overflow */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  /** Callback that fires when scrolling is done inside the ScrollBox */
  onScroll: PropTypes.func,
  /** If true the box shadow effect will be applied to the top and bottom of the scrollbox */
  hasShadows: PropTypes.bool,
};

export default ScrollBox;
