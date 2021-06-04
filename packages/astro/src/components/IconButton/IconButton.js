import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { modes } from '../Button/constants';
import useAriaLabelWarning from '../../hooks/useAriaLabelWarning';

/**
 * Convenience wrapper for a Button + Icon. This component applies specific styles necessary for
 * icons and changes the behavior pattern for Button. This ensures compatibility across browsers
 * and devices.
 *
 * In addition to the props below, `IconButton` accepts the same props available to the normal
 * `Button` component.
 */
const IconButton = forwardRef((props, ref) => {
  const {
    children,
    'aria-label': ariaLabel,
    ...others
  } = props;

  useAriaLabelWarning('IconButton', ariaLabel);

  return (
    <Button
      ref={ref}
      mode={modes.ICON}
      {...others}
    >
      {children}
    </Button>
  );
});

IconButton.propTypes = {
  /** Styling to apply to the IconButton. */
  variant: PropTypes.string,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
};

IconButton.defaultProps = {
  variant: 'iconButton',
};

IconButton.displayName = 'Icon Button';
export default IconButton;
