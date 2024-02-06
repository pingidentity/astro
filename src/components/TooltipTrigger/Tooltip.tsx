import React, { forwardRef, useContext } from 'react';
import { useTooltip } from 'react-aria';

import { TooltipContext } from '../../context/TooltipContext/index';
import { useLocalOrForwardRef } from '../../hooks';
import { DOMAttributes, TooltipProps } from '../../types';
import Text from '../Text';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const {
    children,
    ...others
  } = props;
  const state = useContext(TooltipContext);
  const { tooltipProps } = useTooltip(props, state);

  const tooltipRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  return (
    <Text
      ref={tooltipRef}
      variant="variants.tooltip.container"
      p="sm"
      {...(tooltipProps as DOMAttributes)}
      {...others}
    >
      {children}
    </Text>
  );
});

export default Tooltip;
