/* eslint-disable no-nested-ternary */
import React from 'react';
import { mergeProps, useFocusRing, useSlider, useSliderThumb, VisuallyHidden } from 'react-aria';
import { useSliderState } from 'react-stately';
import { useNumberFormatter } from '@react-aria/i18n';

import { defaultFocus } from '../components/Button/Buttons.styles';
import { Box } from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.ts';

export default {
  title: 'Recipes/Slider',
};

const sx = {
  sliderContainer: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    touchAction: 'none',
  },
  sliderInnerBox: {
    flex: '1 0 auto',
    textAlign: 'end',
  },
  sliderOuterBox: {
    alignSelf: 'stretch',
  },
  sliderBox: {
    position: 'relative',
    height: 30,
    width: ' 100%',
  },
  slider: {
    position: 'absolute',
    height: 10,
    borderRadius: '5px',
    top: 13,
    width: '100%',
  },
  rangeSlider: {
    position: 'absolute',
    backgroundImage:
      'linear-gradient(to right, rgb(169, 215, 50) 10%, rgb(226, 215, 20) 50%, rgb(235, 44, 56) 90%)',
    height: 10,
    borderRadius: '5px',
    top: 13,
    width: '100%',
  },
  thumbContainer: {
    position: 'absolute',
    top: 17,
    transform: 'translateX(-50%)',
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '1px solid #C1C5C8',
    boxShadow: '0 2px 2px 0 #CACACA',
  },
};

const setSliderColor = thumbPosition => {
  return thumbPosition < 25
    ? `linear-gradient(to right, rgb(169, 215, 50) 0%, rgb(169, 215, 50) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`
    : thumbPosition >= 25 && thumbPosition <= 49
      ? `linear-gradient(to right, rgb(226, 215, 20) 0%, rgb(226, 215, 20) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`
      : thumbPosition >= 50 && thumbPosition <= 74
        ? `linear-gradient(to right,  rgb(231, 135, 38) 0%,  rgb(231, 135, 38) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`
        : `linear-gradient(to right, rgb(235, 44, 56) 0%, rgb(235, 44, 56) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`;
};

/*
 * The slider value can be formatted by using the `formatOptions` prop.
`* formatOptions` is compatible with the option parameter of
 * [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
 * and is applied based on the current locale.
 * https://react-spectrum.adobe.com/react-aria/useSlider.html
 */

export const Default = () => {
  return (
    <>
      <Box mb="xl">
        <Slider
          label="Single with solid lower background"
          maxValue={100}
          step={1}
        />
      </Box>
      <Box>
        <RangeSlider
          label="Multiple with gradient background and custom point values"
          maxValue={100}
          defaultValue={[0, 1]}
          step={1}
        />
      </Box>
    </>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.slider.default,
  },
};

const Slider = props => {
  const trackRef = React.useRef(null);
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  );
  const thumbPosition = state.getThumbPercent(0) * 100;

  return (
    <Box {...groupProps} sx={sx.sliderContainer}>
      {/* Create a flex container for the label and output element. */}
      <Box sx={sx.sliderOuterBox}>
        {props.label && <label {...labelProps}>{props.label}</label>}
        <Box {...outputProps} sx={sx.sliderInnerBox}>
          (
          {state.getThumbValueLabel(0)}
          )
        </Box>
      </Box>
      {/* The track element holds the visible track line and the thumb. */}
      <Box {...trackProps} ref={trackRef} sx={sx.sliderBox}>
        <Box
          sx={{ ...sx.slider, backgroundImage: setSliderColor(thumbPosition) }}
        />
        <Thumb index={0} state={state} trackRef={trackRef} />
      </Box>
    </Box>
  );
};

const RangeSlider = props => {
  const trackRef = React.useRef(null);
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  );

  return (
    <Box {...groupProps} sx={sx.sliderContainer}>
      <Box sx={sx.sliderOuterBox}>
        {props.label && <label {...labelProps}>{props.label}</label>}
        <Box {...outputProps} sx={sx.sliderInnerBox}>
          (
          {`${state.getThumbValueLabel(0)}, ${state.getThumbValueLabel(1)}`}
          )
        </Box>
      </Box>
      <Box {...trackProps} ref={trackRef} sx={sx.sliderBox}>
        <Box sx={sx.rangeSlider} />
        <Thumb index={0} state={state} trackRef={trackRef} />
        <Thumb index={1} state={state} trackRef={trackRef} />
      </Box>
    </Box>
  );
};

const Thumb = props => {
  const { state, trackRef, index } = props;
  const inputRef = React.useRef(null);
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state,
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Box
      sx={{
        ...sx.thumbContainer,
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <Box
        {...thumbProps}
        sx={{
          ...sx.thumb,
          ...(isFocusVisible && defaultFocus),
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </Box>
    </Box>
  );
};
