import { mergeProps, useNumberFormatter, useSlider } from 'react-aria';
import { SliderStateOptions, useSliderState } from 'react-stately';
import type { AriaSliderProps } from '@react-types/slider';

import { UseSliderFieldProps } from '../../types/sliderField';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import useStatusClasses from '../useStatusClasses';

export const getDefaultValue = ({
  defaultValueProp,
  minValue,
  step,
}) => {
  if (defaultValueProp !== undefined) {
    return defaultValueProp;
  }
  return [minValue, step * 3];
};

export const getDisplayValue = ({
  displayValueProp,
  isMultiThumb,
  state,
}) => {
  if (displayValueProp) {
    return displayValueProp;
  }
  if (isMultiThumb) {
    return `${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`;
  }
  return state.getThumbValueLabel(0);
};

const useSliderField = (props: UseSliderFieldProps) => {
  const {
    activeTrackProps,
    autoFocus,
    className,
    defaultValue: defaultValueProp,
    displayValue: displayValueProp,
    formatOptions,
    helperTextProps,
    isDisabled,
    isDisplayValueHidden = false,
    isMultiThumb = false,
    label,
    labelProps,
    maxValue = 100,
    minValue = 0,
    name,
    onBlur,
    onChange,
    onChangeEnd,
    onFocus,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    orientation,
    outputProps,
    size = '300px',
    status,
    step = 10,
    sx = {},
    thumbProps,
    trackProps,
    trackRef,
    value,
    wrapperProps,
    ...others
  } = props;

  const defaultValue = !isMultiThumb
    ? defaultValueProp : getDefaultValue({ defaultValueProp, minValue, step });

  const numberFormatter = useNumberFormatter(formatOptions);
  const sliderStateOptions = {
    defaultValue,
    isDisabled,
    label,
    maxValue,
    minValue,
    numberFormatter,
    onChange,
    onChangeEnd,
    orientation,
    step,
    value,
  } as SliderStateOptions<number | number[]>;

  const state = useSliderState(sliderStateOptions);
  const { ariaProps, nonAriaProps } = getAriaAttributeProps(others);

  const thumbOptions = {
    ...thumbProps,
    autoFocus,
    isDisabled,
    name,
    onBlur,
    onFocus,
    onFocusChange,
    onKeyDown,
    onKeyUp,
  };

  const sliderOptions = {
    ...ariaProps,
    defaultValue,
    isDisabled,
    label,
    maxValue,
    minValue,
    name,
    onChange,
    onChangeEnd,
    orientation,
    value,
  } as AriaSliderProps;

  const {
    groupProps,
    trackProps: raTrackProps,
    labelProps: raLabelProps,
    outputProps: raOutputProps,
  } = useSlider(sliderOptions, state, trackRef);

  const isHorizontal = state.orientation === 'horizontal';
  const isVertical = state.orientation === 'vertical';

  const displayValue = getDisplayValue({ displayValueProp, state, isMultiThumb });
  const statusClasses = {
    isHorizontal,
    isVertical,
    isMultiThumb,
    isSingleThumb: !isMultiThumb,
  };

  const { classNames } = useStatusClasses(className, statusClasses);

  const {
    classNames: visibleTrackClassNames,
  } = useStatusClasses(trackProps?.className, statusClasses);

  const {
    classNames: labelContainerClassNames,
  } = useStatusClasses(labelProps?.className, statusClasses);

  const { classNames: hiddenTrackClassNames } = useStatusClasses(className, statusClasses);

  const { classNames: wrapperClassName } = useStatusClasses(wrapperProps?.className, statusClasses);

  const {
    classNames: activeTrackClassNames,
  } = useStatusClasses(activeTrackProps?.className, statusClasses);

  const thumbPropsSpread = {
    ...thumbOptions,
    ...thumbProps,
    isHorizontal,
    isVertical,
    state,
    trackRef,
  };

  const mergedOuputProps = mergeProps(outputProps, raOutputProps, { as: 'output', variant: 'label' });

  const mergedLabelProps = mergeProps(labelProps, raLabelProps);

  const labelContainerProps = {
    label,
    labelProps: mergedLabelProps,
    isDisplayValueHidden,
    outputProps: mergedOuputProps,
    isHorizontal,
    displayValue,
    isVertical,
    className: labelContainerClassNames,
  };

  const sliderActiveTrackProps = {
    ...activeTrackProps,
    isMultiThumb,
    className: activeTrackClassNames,
    isHorizontal,
    isVertical,
    state,
  };

  const wrapperPropsSpread = {
    ...wrapperProps,
    className: wrapperClassName,
    variant: 'slider.wrapper',
  };

  const sizeProperty = isHorizontal ? 'width' : 'height';

  const containerProps = {
    ...others,
    ...groupProps,
    sx: {
      [sizeProperty]: size,
      ...sx,
    },
    variant: 'slider.slider',
    className: classNames,
  };

  const hiddenTrackProps = {
    ...raTrackProps,
    trackRef,
    variant: 'slider.hiddenTrack',
    className: hiddenTrackClassNames,
  };

  const visibleTrackProps = {
    variant: 'slider.track',
    className: visibleTrackClassNames,
    ...trackProps,
  };

  const helperTextPropsSpread = {
    ...helperTextProps,
    status,
  };

  return {
    containerProps,
    labelContainerProps,
    sliderActiveTrackProps,
    hiddenTrackProps,
    thumbPropsSpread,
    classNames,
    visibleTrackProps,
    helperTextProps: helperTextPropsSpread,
    wrapperProps: wrapperPropsSpread,
  };
};

export default useSliderField;
