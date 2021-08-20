import React, { forwardRef } from 'react';
import HelpIcon from 'mdi-react/HelpIcon';
import IconButton from '../IconButton';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';
import Icon from '../Icon';

const HelpHint = forwardRef((props, ref) => {
  const {
    children,
    ...others
  } = props;

  return (
    <TooltipTrigger ref={ref} {...others} >
      <IconButton variant="helpHint" aria-label="label help hint">
        <Icon icon={HelpIcon} size="11px" />
      </IconButton>
      <Tooltip>{children}</Tooltip>
    </TooltipTrigger>
  );
});

export default HelpHint;
