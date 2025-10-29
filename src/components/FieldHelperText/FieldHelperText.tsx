import React, { forwardRef } from 'react';

import { useStatusClasses } from '../../hooks';
import { FieldHelperTextProps } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';
import Text from '../Text';

/**
 * Displays a styled message.
 *
 * **NOTE**: Specialized field components contain built-in support for helper text. It's
 * recommended to use those instead of a standalone `FieldHelperText`.
 */

const FieldHelperText = forwardRef<HTMLDivElement, FieldHelperTextProps>((props, ref) => {
  const {
    className,
    /* istanbul ignore next */
    status = statuses.DEFAULT,
    id,
    ...others
  } = props;
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

FieldHelperText.defaultProps = {
  ...statusDefaultProp,
};

FieldHelperText.displayName = 'FieldHelperText';
export default FieldHelperText;
