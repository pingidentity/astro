import React, { forwardRef } from 'react';

import { useGetTheme } from '../../hooks';
import useCircularLoader from '../../hooks/useCircularLoader/useCircularLoader';
import { LoaderProps } from '../../types';
import Box from '../Box';

const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const {
    dotProps,
    progress = 75,
    strokeColor,
    strokeBaseColor,
    ...others
  } = props;

  const {
    activeColor,
    backgroundBaseColor,
    themeState,
    defaultLoaderSize,
  } = useGetTheme();

  const {
    center,
    radius,
    strokeWidth,
    dashLength,
    gapLength,
    size,
    isCircle,
  } = useCircularLoader({ ...props, defaultLoaderSize, isAstro: themeState.isAstro });

  if (isCircle) {
    return (
      <Box
        ref={ref}
        variant="loader.circleContainer"
        role="alert"
        aria-live="assertive"
        aria-label="Loading in progress"
        {...others}
      >
        <Box variant="loader.circleSpinner" p={strokeWidth}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={strokeBaseColor || backgroundBaseColor}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={strokeColor || activeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${gapLength}`}
              strokeLinecap="round" // For rounded corners
              transform={`rotate(-90 ${center} ${center})`}
            />
          </svg>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      isRow
      fontSize={size}
      variant="loader.container"
      role="alert"
      aria-live="assertive"
      aria-label="Loading in progress"
      {...others}
    >
      <Box variant="loader.dotLeft" {...dotProps} />
      <Box variant="loader.dotCenter" {...dotProps} />
      <Box variant="loader.dotRight" {...dotProps} />
    </Box>
  );
});


export default Loader;
