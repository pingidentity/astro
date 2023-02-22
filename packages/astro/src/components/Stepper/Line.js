import React from 'react';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import Box from '../Box';

import { stepStatuses } from './Stepper.constants';

const {
  INACTIVE,
} = stepStatuses;

const Line = ({ className, status }) => {
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

Line.defaultProps = {
  status: INACTIVE,
};

export default Line;
