import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { useTooltip } from '@react-aria/tooltip';
import { TooltipContext } from '../../context/TooltipContext/index';
import Box from '../Box';

const Tooltip = forwardRef((props, ref) => {
  const { state } = useContext(TooltipContext);
  const { tooltipProps } = useTooltip(props, state);
  const tooltipRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => tooltipRef.current);

  return <Box ref={tooltipRef} sx={{ p: 'sm' }} {...tooltipProps} {...props} />;
});

export default Tooltip;
