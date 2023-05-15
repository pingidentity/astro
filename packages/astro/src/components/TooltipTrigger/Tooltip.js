import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { useTooltip } from 'react-aria';

import { TooltipContext } from '../../context/TooltipContext/index';
import Text from '../Text';

const Tooltip = forwardRef((props, ref) => {
  const {
    children,
    ...others
  } = props;
  const { state } = useContext(TooltipContext);
  const { tooltipProps } = useTooltip(props, state);
  const tooltipRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => tooltipRef.current);

  return (
    <Text
      ref={tooltipRef}
      variant="variants.tooltip.container"
      p="sm"
      {...tooltipProps}
      {...others}
    >
      {children}
    </Text>
  );
});

export default Tooltip;
