import React, { forwardRef } from 'react';
import { useProgressBar } from '@react-aria/progress';

import { Box, Text } from '../..';
import { useLocalOrForwardRef } from '../../hooks';
import { ProgressBarProps } from '../../types';

// Calculate the width of the progress bar as a percentage
export const calculateBarWidth = (value: number, minValue: number, maxValue: number): string => {
  if (value < minValue) {
    throw new Error('Value cannot be less than minValue');
  }

  if (value > maxValue) {
    throw new Error('Value cannot be greater than maxValue');
  }

  const percentage = (value - minValue) / (maxValue - minValue);
  const barWidth = `${Math.round(percentage * 100)}%`;

  return barWidth;
};

const ProgressBar = forwardRef<HTMLElement, ProgressBarProps>((props, ref) => {
  const {
    label = '',
    showValueLabel = true,
    value,
    minValue = 0,
    maxValue = 100,
  } = props;


  const progressBarRef = useLocalOrForwardRef<HTMLElement>(ref);

  const {
    progressBarProps,
    labelProps,
  } = useProgressBar(props);

  const barWidth = calculateBarWidth(value, minValue, maxValue);

  const ariaLabel = props['aria-label'];

  return (
    <Box {...progressBarProps} role="progressbar" aria-labelledby={labelProps.id} aria-label={ariaLabel} gap="2px" ref={progressBarRef}>
      <Box isRow justifyContent="space-between">
        {label
          && (
            <Text fontSize="xs" fontWeight="3" {...labelProps}>
              {label}
            </Text>
          )}
        {showValueLabel
          && (
            <Text fontSize="xs" fontWeight="3">
              {progressBarProps['aria-valuetext']}
            </Text>
          )}
      </Box>
      <Box variant="progressBar.container">
        <Box variant="progressBar.percentageBar" style={{ width: barWidth }} />
      </Box>
    </Box>
  );
});

export default ProgressBar;
