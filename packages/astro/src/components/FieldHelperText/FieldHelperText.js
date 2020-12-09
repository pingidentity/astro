import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import useStatusClasses from '../../hooks/useStatusClasses';
import statuses from '../../utils/devUtils/constants/statuses';
import Text from '../Text';

/**
 * Displays a styled message. Used internally in many of the `Field` component variants.
 */
const FieldHelperText = forwardRef((props, ref) => {
  const { className, status, ...others } = props;
  const { classNames } = useStatusClasses(className, {
    [`is-${status}`]: true,
  });
  return (
    <Text
      ref={ref}
      pt="sm"
      variant="fieldHelperText"
      {...others}
      className={classNames}
    />
  );
});

FieldHelperText.propTypes = {
  /** Determines the color of the field message. */
  status: PropTypes.oneOf(Object.values(statuses)),
};

FieldHelperText.defaultProps = {
  status: statuses.DEFAULT,
};

FieldHelperText.displayName = 'FieldHelperText';
export default FieldHelperText;
