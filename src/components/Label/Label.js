import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Label as RLabel } from '@rebass/forms';
import { getDisabledStyles } from '../../utils/styleUtils';

const Label = forwardRef((props, ref) => {
  const {
    isDisabled,
    sx, // eslint-disable-line
  } = props;

  return (
    <RLabel
      ref={ref}
      {...props}
      sx={{
        ...getDisabledStyles(isDisabled),
        ...sx,
      }}
    />
  );
});

Label.propTypes = {
  /** Whether the label has disabled styling applied. */
  isDisabled: PropTypes.bool,
};

Label.displayName = 'Label';

export default Label;
