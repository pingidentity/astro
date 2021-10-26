import React, { forwardRef } from 'react';
import HelpIcon from 'mdi-react/HelpIcon';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';
import Icon from '../Icon';

const HelpHint = forwardRef((props, ref) => {
  const {
    children,
    tooltipProps,
    iconButtonProps,
    ...others
  } = props;

  return (
    <TooltipTrigger ref={ref} {...others} >
      <IconButton variant="helpHint" aria-label="label help hint" data-testid="help-hint__button" {...iconButtonProps}>
        <Icon icon={HelpIcon} size="11px" />
      </IconButton>
      <Tooltip {...tooltipProps} >{children}</Tooltip>
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
