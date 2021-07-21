import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { modes } from '../Button/constants';
import { useAriaLabelWarning } from '../../hooks';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';

/**
 * Convenience wrapper for a Button + Icon. This component applies specific styles necessary for
 * icons and changes the behavior pattern for Button. This ensures compatibility across browsers
 * and devices.
 *
 * In addition to the props below, `IconButton` accepts the same props available to the normal
 * `Button` component.
 */
const IconButton = forwardRef((props, ref) => {
  const { children, title, ...others } = props;

  const ariaLabel = props['aria-label'] || title;
  useAriaLabelWarning('IconButton', ariaLabel);

  const button = (
    <Button ref={ref} mode={modes.ICON} aria-label={ariaLabel} {...others}>
      {children}
    </Button>
  );

  if (title) {
    return (
      <TooltipTrigger isDisabled={!title}>
        {button}
        {title && <Tooltip>{title}</Tooltip>}
      </TooltipTrigger>
    );
  }

  return button;
});

IconButton.propTypes = {
  /** Styling to apply to the IconButton. */
  variant: PropTypes.string,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Content will be displayed in a tooltip on hover or focus. */
  title: PropTypes.string,
};

IconButton.defaultProps = {
  variant: 'iconButton',
};

IconButton.displayName = 'Icon Button';
export default IconButton;
