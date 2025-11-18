import React, { forwardRef } from 'react';
import CheckBoldIcon from '@pingux/mdi-react/CheckBoldIcon';
import { useHover } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { Box, Icon } from '../../index';
import ORIENTATION from '../../utils/devUtils/constants/orientation';

import { stepStatuses } from './Stepper.constants';

const {
  COMPLETED,
  INACTIVE,
} = stepStatuses;

const Step = forwardRef((props, ref) => {
  const { status, value, className, orientation } = props;
  const { hoverProps, isHovered } = useHover(props);

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

Step.propTypes = {
  status: PropTypes.oneOf(Object.values(stepStatuses)),
  value: PropTypes.number,
  orientation: PropTypes.oneOf([
    ORIENTATION.VERTICAL,
    ORIENTATION.HORIZONTAL,
  ]),

};

Step.defaultProps = {
  status: INACTIVE,
  value: 0,
};

export default Step;
