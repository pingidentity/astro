import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';
import CheckBoldIcon from 'mdi-react/CheckBoldIcon';
import PropTypes from 'prop-types';

import { Box, Icon } from '../../index';

import { stepStatuses } from './Stepper.constants';

const {
  COMPLETED,
  INACTIVE,
} = stepStatuses;

const Step = forwardRef((props, ref) => {
  const { status, value } = props;
  const { hoverProps, isHovered } = useHover(props);

  return (
    <Box
      variant={`stepper.step.${status}`}
      ref={ref}
      {...hoverProps}
    >
      {status === COMPLETED && !isHovered
        ? (
          <Icon
            icon={CheckBoldIcon}
            size={23}
            color="text.primaryLight"
          />
        )
        : value}
    </Box>
  );
});

Step.propTypes = {
  status: PropTypes.oneOf(Object.values(stepStatuses)),
  value: PropTypes.number,
};

Step.defaultProps = {
  status: INACTIVE,
  value: 0,
};

export default Step;
