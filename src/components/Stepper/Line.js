/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import Box from '../Box';

import { stepStatuses } from './Stepper.constants';

const {
  INACTIVE,
} = stepStatuses;

const Line = ({
  className,
  /* istanbul ignore next */
  status = INACTIVE,
}) => {
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

Line.propTypes = {
  status: PropTypes.oneOf(Object.values(stepStatuses)),
};

export default Line;
