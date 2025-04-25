import React, { forwardRef, useRef } from 'react';
import { mergeProps, useFocusRing, useSliderThumb, VisuallyHidden } from 'react-aria';
import { useHover, usePress } from '@react-aria/interactions';

import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { SliderThumbProps } from '../../types/sliderField';
import Box from '../Box';
import Input from '../Input';

const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const inputRef = useRef(null);
  const thumbRef = useLocalOrForwardRef<HTMLDivElement>(ref);
  const {
    className,
    index,
    inputProps,
    isHorizontal,
    isVertical,
    name,
    onFocus,
    onFocusChange,
    onPress,
    state,
    trackRef,
    ...others
  } = props;


  const { thumbProps, inputProps: raInputProps, isDragging } = useSliderThumb({
    index,
    trackRef,
    inputRef,
    name,
  }, state);

  const { focusProps, isFocusVisible } = useFocusRing();

  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({ ref: thumbRef, onPress });

  const { classNames } = useStatusClasses(className, {
    isDragging,
    isFocused: isFocusVisible,
    isHorizontal,
    isVertical,
    isHovered,
    isPressed,
  });

  const mergedThumbProps = mergeProps(pressProps, others, hoverProps, thumbProps);

  return (
    <Box
      className={classNames}
      variant="slider.thumb"
      data-testid="thumb"
      {...mergedThumbProps}
    >
      <VisuallyHidden>
        <Input ref={inputRef} data-testid="input" {...mergeProps(inputProps, raInputProps, focusProps)} name={name} />
      </VisuallyHidden>
    </Box>
  );
});

export default SliderThumb;
