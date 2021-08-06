import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from 'mdi-react/HelpIcon';
import IconButton from '../IconButton';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';
import Icon from '../Icon';

const HelpHint = forwardRef((props, ref) => {
  const {
    tooltipTriggerProps,
    children,
  } = props;

  return (
    <TooltipTrigger ref={ref} {...tooltipTriggerProps} >
      <IconButton size="13px" variant="helpHint" aria-label="my-label" >
        <Icon icon={HelpIcon} />
      </IconButton>
      <Tooltip>{children}</Tooltip>
    </TooltipTrigger>
  );
});

HelpHint.defaultProps = {
  tooltipTriggerProps: {
    direction: 'right',
  },
};

HelpHint.propTypes = {
  tooltipTriggerProps: PropTypes.shape({}),
};

export default HelpHint;
