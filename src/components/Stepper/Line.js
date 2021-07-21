import React from 'react';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import { stepStatuses } from './Stepper.constants';
import Box from '../Box';

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
