import React, { forwardRef } from 'react';

import { useSliderField } from '../../hooks';
import { Box, FieldHelperText } from '../../index';
import { SliderFieldProps } from '../../types/sliderField';

import SliderActiveTrack from './SliderActiveTrack';
import SliderLabelContainer from './SliderLabelContainer';
import SliderThumb from './SliderThumb';

const SliderField = forwardRef<HTMLDivElement, SliderFieldProps>((props, ref) => {
  const {
    helperText,
    isMultiThumb = false,
  } = props;
  const trackRef = React.useRef(null);

  const {
    containerProps,
    labelContainerProps,
    sliderActiveTrackProps,
    hiddenTrackProps,
    helperTextProps,
    thumbPropsSpread,
    visibleTrackProps,
    wrapperProps,
  } = useSliderField({ ...props, trackRef });

  return (
    <Box {...containerProps} ref={ref}>
      <Box {...wrapperProps}>
        {labelContainerProps.isHorizontal
      && (
      <SliderLabelContainer
        {...labelContainerProps}
      />
      )}
        <Box
          {...visibleTrackProps}
        >
          <SliderActiveTrack {...sliderActiveTrackProps} />
          <Box
            {...hiddenTrackProps}
            ref={trackRef}
          >
            <SliderThumb {...thumbPropsSpread} index={0} />
            {isMultiThumb && <SliderThumb {...thumbPropsSpread} index={1} />}
          </Box>
        </Box>
      </Box>
      {labelContainerProps.isVertical
      && (
      <SliderLabelContainer
        {...labelContainerProps}
      />
      )}
      {
        helperText
        && (
          <FieldHelperText {...helperTextProps}>
            {helperText}
          </FieldHelperText>
        )
      }
    </Box>
  );
});

export default SliderField;
