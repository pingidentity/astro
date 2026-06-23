/* istanbul ignore file */
import React from 'react';

import { useStatusClasses } from '../../hooks';
import Box from '../Box';

import { StepStatus, stepStatuses } from './Stepper.constants';

const {
  INACTIVE,
} = stepStatuses;

interface LineProps {
  className?: string;
  status?: StepStatus;
}

const Line = ({
  className,
  /* istanbul ignore next */
  status = INACTIVE,
}: LineProps) => {
  const { classNames } = useStatusClasses(className, {
    isInactive: status === INACTIVE,
  });

  return (
    <Box
      variant="stepper.line"
      className={classNames}
    />
  );
};

export default Line;
