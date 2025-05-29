import React, { forwardRef } from 'react';

import { Box, Label, Text } from '../../index';
import { SliderLabelContainerProps } from '../../types/sliderField';

const SliderLabelContainer = forwardRef<HTMLDivElement, SliderLabelContainerProps>((props, ref) => {
  const {
    displayValue,
    label,
    labelProps,
    isDisplayValueHidden,
    outputProps,
    className,
    helpHintProps,
  } = props;

  return (
    <Box ref={ref} className={className} variant="slider.labelContainer">
      {label
          && (
          <Box sx={{ gap: '0px' }}>
            <Label {...labelProps} sx={{ mb: '0px' }} helpHintProps={helpHintProps}>{label}</Label>
          </Box>
          )}
      {!isDisplayValueHidden && (
      <Box className={className} variant="slider.outputContainer">
        <Text {...outputProps}>
          {displayValue}
        </Text>
      </Box>
      )}
    </Box>
  );
});

export default SliderLabelContainer;
