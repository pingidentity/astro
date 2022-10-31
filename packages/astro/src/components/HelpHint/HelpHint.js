import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import IconButton from '../IconButton';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';
import Icon from '../Icon';

const HelpIcon = () => (
  <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.56685 7.306V9H4.29385V7.306H2.56685ZM0.795848 3.676H2.41285C2.41285 3.478 2.43485 3.29467 2.47885 3.126C2.52285 2.95 2.58885 2.79967 2.67685 2.675C2.77218 2.543 2.88951 2.44033 3.02885 2.367C3.17551 2.28633 3.34785 2.246 3.54585 2.246C3.83918 2.246 4.06651 2.32667 4.22785 2.488C4.39651 2.64933 4.48085 2.89867 4.48085 3.236C4.48818 3.434 4.45151 3.599 4.37085 3.731C4.29751 3.863 4.19851 3.984 4.07385 4.094C3.94918 4.204 3.81351 4.314 3.66685 4.424C3.52018 4.534 3.38085 4.666 3.24885 4.82C3.11685 4.96667 2.99951 5.14633 2.89685 5.359C2.80151 5.57167 2.74285 5.83567 2.72085 6.151V6.646H4.20585V6.228C4.23518 6.008 4.30485 5.82467 4.41485 5.678C4.53218 5.53133 4.66418 5.403 4.81085 5.293C4.95751 5.17567 5.11151 5.062 5.27285 4.952C5.44151 4.83467 5.59185 4.69533 5.72385 4.534C5.86318 4.37267 5.97685 4.17833 6.06485 3.951C6.16018 3.72367 6.20785 3.434 6.20785 3.082C6.20785 2.86933 6.16018 2.642 6.06485 2.4C5.97685 2.15067 5.82651 1.91967 5.61385 1.707C5.40118 1.49433 5.11885 1.31833 4.76685 1.179C4.42218 1.03233 3.98951 0.959 3.46885 0.959C3.06551 0.959 2.69885 1.02867 2.36885 1.168C2.04618 1.3 1.76751 1.487 1.53285 1.729C1.30551 1.971 1.12585 2.257 0.993848 2.587C0.869181 2.917 0.803181 3.28 0.795848 3.676Z" fill="#3B4A58" />
  </svg>
);

/**
 * A `HelpHint` is a composed component using tooltip trigger and icon button.
 *
 * For customization the trigger icon,
 * please see the [TooltipTrigger](./?path=/docs/tooltiptrigger--default) docs.
 */

const HelpHint = forwardRef((props, ref) => {
  const {
    children,
    tooltipProps,
    iconButtonProps,
    ...others
  } = props;

  const tooltipId = uuid();

  return (
    <TooltipTrigger ref={ref} direction="top" {...others} {...tooltipProps} >
      <IconButton variant="variants.helpHint.button" aria-label="label help hint" data-testid="help-hint__button" aria-describedby={tooltipId} {...iconButtonProps}>
        <Icon icon={HelpIcon} />
      </IconButton>
      <Tooltip {...tooltipProps} role="tooltip" aria-live="polite" id={tooltipId}>{children}</Tooltip>
    </TooltipTrigger>
  );
});

HelpHint.propTypes = {
  /** Props object that is spread directly into the tooltip element. */
  tooltipProps: PropTypes.shape({}),
  /** Props object that is spread directly into the IconButton element. */
  iconButtonProps: PropTypes.shape({}),
};

export default HelpHint;
