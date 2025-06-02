import React, { forwardRef } from 'react';

import { Box } from '../../index';
import { SliderActiveTrackProps } from '../../types/sliderField';

const SliderActiveTrack = forwardRef<HTMLDivElement, SliderActiveTrackProps>((props, ref) => {
  const {
    className,
    isHorizontal,
    isMultiThumb,
    length,
    sx,
    trackStart,
    ...others
  } = props;

  const cssLenProp = isHorizontal ? 'width' : 'height';
  const cssStartProp = isHorizontal ? 'left' : 'top';

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        [cssLenProp]: length,
        ...(isMultiThumb && {
          [cssStartProp]: trackStart,
        }),
        ...sx,
      }}
      variant="slider.activeTrack"
      {...others}
    />
  );
});

export default SliderActiveTrack;
