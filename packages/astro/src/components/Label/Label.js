import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Label as RLabel } from '@rebass/forms';

import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';

const defaultIndicator = (
  <Box variant="forms.label.indicator">
    *
  </Box>
);

/**
 * Base label for an input.
 *
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
 * Built on top of the [Label from Rebass.js](https://rebassjs.org/forms/label).
 *
 * **NOTE**: Specialized field components contain built-in support for labels. It's
 * recommended to use those instead of a standalone `Label`.
 */

const Label = forwardRef((props, ref) => {
  const {
    children,
    className,
    isDisabled,
    isRequired,
    requiredIndicator,
    ...others
  } = props;
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isRequired,
  });

  return (
    <RLabel
      ref={ref}
      className={classNames}
      {...others}
    >
      {children}
      {
        isRequired
        && requiredIndicator
      }
    </RLabel>
  );
});

Label.propTypes = {
  /** Whether the label has disabled styling applied. */
  isDisabled: PropTypes.bool,
  /** Whether the label has required indicator styling applied. */
  isRequired: PropTypes.bool,
  requiredIndicator: PropTypes.node,
};

Label.defaultProps = {
  requiredIndicator: defaultIndicator,
};

Label.displayName = 'Label';
export default Label;
