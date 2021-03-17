import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Label as RLabel } from '@rebass/forms';

import useStatusClasses from '../../hooks/useStatusClasses';
import { modes } from './constants';
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
    mode,
    requiredIndicator,
    ...others
  } = props;
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isRequired,
    isFloatLabel: mode === modes.FLOAT,
    isLeftLabel: mode === modes.LEFT,
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
  /** Determines the behavior pattern for the label. */
  mode: PropTypes.oneOf(Object.values(modes)),
  /** The visual component used to mark an input as required within the label. */
  requiredIndicator: PropTypes.node,
};

Label.defaultProps = {
  mode: modes.DEFAULT,
  requiredIndicator: defaultIndicator,
};

Label.displayName = 'Label';
export default Label;
