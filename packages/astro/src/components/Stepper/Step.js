import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import CheckBoldIcon from 'mdi-react/CheckBoldIcon';
import { useHover } from '@react-aria/interactions';

import { stepStatuses } from './Stepper.constants';

import { Box, Icon } from '../../index';

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
      {status === COMPLETED && !isHovered ?
        <Icon
          icon={CheckBoldIcon}
          size={23}
          color="text.primaryLight"
        />
        : value
      }
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
