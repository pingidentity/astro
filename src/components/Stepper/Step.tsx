import React, { forwardRef } from 'react';
import CheckBoldIcon from '@pingux/mdi-react/CheckBoldIcon';
import { useHover } from '@react-aria/interactions';

import { Box, Icon } from '../../index';
import ORIENTATION from '../../utils/devUtils/constants/orientation';

import { StepStatus, stepStatuses } from './Stepper.constants';

const {
  COMPLETED,
  INACTIVE,
} = stepStatuses;

interface StepProps {
  status?: StepStatus;
  value?: number;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

const Step = forwardRef<HTMLElement, StepProps>((props, ref) => {
  const { status = INACTIVE, value = 0, className, orientation } = props;
  const { hoverProps, isHovered } = useHover({});

  const stepValue = orientation !== ORIENTATION.VERTICAL && value;

  return (
    <Box
      variant={`stepper.step.${status}`}
      ref={ref}
      {...hoverProps}
      className={className}
    >
      {status === COMPLETED && !isHovered
        ? (
          <Icon
            icon={CheckBoldIcon}
            size="sm"
            color="text.primaryLight"
            title={{ name: 'Check Bold Icon' }}
          />
        )
        : stepValue}
    </Box>
  );
});

Step.displayName = 'Step';

export default Step;
