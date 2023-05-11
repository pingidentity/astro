import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';
import Text from '../Text';

/**
 * Displays a styled message.
 *
 * **NOTE**: Specialized field components contain built-in support for helper text. It's
 * recommended to use those instead of a standalone `FieldHelperText`.
 */
const FieldHelperText = forwardRef((props, ref) => {
  const { className, status, id, ...others } = props;
  const { classNames } = useStatusClasses(className, {
    [`is-${status}`]: true,
  });

  return (
    <Text
      ref={ref}
      pt="sm"
      variant="variants.fieldHelperText.title"
      role={status === 'error' ? 'alert' : 'status'}
      id={id}
      {...others}
      className={classNames}
    />
  );
});

FieldHelperText.propTypes = {
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  ...statusPropTypes,
};

FieldHelperText.defaultProps = {
  ...statusDefaultProp,
};

FieldHelperText.displayName = 'FieldHelperText';
export default FieldHelperText;
