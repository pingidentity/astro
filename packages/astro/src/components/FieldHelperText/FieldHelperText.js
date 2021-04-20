import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import useStatusClasses from '../../hooks/useStatusClasses';
import statuses from '../../utils/devUtils/constants/statuses';
import Text from '../Text';

/**
 * Displays a styled message.
 *
 * **NOTE**: Specialized field components contain built-in support for helper text. It's
 * recommended to use those instead of a standalone `FieldHelperText`.
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
      role="status"
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
