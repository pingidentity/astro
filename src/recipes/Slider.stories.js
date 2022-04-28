/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSlider, useSliderThumb } from '@react-aria/slider';
import { useSliderState } from '@react-stately/slider';
import { useFocusRing } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { mergeProps } from '@react-aria/utils';
import { useNumberFormatter } from '@react-aria/i18n';
import { Box } from '../index';

export default {
  title: 'Recipes/Slider',
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

const Slider = (props) => {
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
    <Box
      {...groupProps}
      sx={{
        position: 'relative',
        alignItems: 'center',
        width: '100%',
        touchAction: 'none',
      }}
    >
      {/* Create a flex container for the label and output element. */}
      <Box sx={{
        alignSelf: 'stretch',
        }}
      >
        {props.label && <label {...labelProps}>{props.label}</label>}
        <Box
          {...outputProps}
          sx={{
            flex: '1 0 auto',
            textAlign: 'end',
          }}
        >
          ({state.getThumbValueLabel(0)})
        </Box>
      </Box>
      {/* The track element holds the visible track line and the thumb. */}
      <Box
        {...trackProps}
        ref={trackRef}
        sx={{
          position: 'relative',
          height: 30,
          width: ' 100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            backgroundImage:
              thumbPosition < 25
                ? `linear-gradient(to right, rgb(169, 215, 50) 0%, rgb(169, 215, 50) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`
                : thumbPosition >= 25 && thumbPosition <= 49
                ? `linear-gradient(to right, rgb(226, 215, 20) 0%, rgb(226, 215, 20) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`
                : thumbPosition >= 50 && thumbPosition <= 74
                ? `linear-gradient(to right,  rgb(231, 135, 38) 0%,  rgb(231, 135, 38) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`
                : `linear-gradient(to right, rgb(235, 44, 56) 0%, rgb(235, 44, 56) ${thumbPosition}%, rgb(242, 242, 242) ${thumbPosition}%, rgb(242, 242, 242) 100%)`,
            height: 10,
            borderRadius: '5px',
            top: 13,
            width: '100%',
          }}
        />
        <Thumb index={0} state={state} trackRef={trackRef} />
      </Box>
    </Box>
  );
};

const RangeSlider = (props) => {
  const trackRef = React.useRef(null);
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  );

  return (
    <Box
      {...groupProps}
      sx={{
        position: 'relative',
        alignItems: 'center',
        width: '100%',
        touchAction: 'none',
      }}
    >
      <Box sx={{
        alignSelf: 'stretch',
        }}
      >
        {props.label && <label {...labelProps}>{props.label}</label>}
        <Box
          {...outputProps}
          sx={{
            flex: '1 0 auto',
            textAlign: 'end',
            }}
        >
          ({`${state.getThumbValueLabel(0)}, ${state.getThumbValueLabel(1)}`})
        </Box>
      </Box>
      <Box
        {...trackProps}
        ref={trackRef}
        sx={{
          position: 'relative',
          height: 30,
          width: ' 100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            backgroundImage:
              'linear-gradient(to right, rgb(169, 215, 50) 10%, rgb(226, 215, 20) 50%, rgb(235, 44, 56) 90%)',
            height: 10,
            borderRadius: '5px',
            top: 13,
            width: '100%',
          }}
        />
        <Thumb index={0} state={state} trackRef={trackRef} />
        <Thumb index={1} state={state} trackRef={trackRef} />
      </Box>
    </Box>
  );
};

const Thumb = (props) => {
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
        position: 'absolute',
        top: 5,
        transform: 'translateX(-50%)',
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <Box
        {...thumbProps}
        sx={{
          width: 25,
          height: 25,
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '1px solid #C1C5C8',
          boxShadow: '0 2px 2px 0 #CACACA',
          outline: isFocusVisible ? '5px solid rgba(41,150,204,0.5)' : 'none',
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </Box>
    </Box>
  );
};
