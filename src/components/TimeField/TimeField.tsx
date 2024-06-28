import React, { forwardRef, useRef } from 'react';
import { FocusScope } from 'react-aria';
import { parseTime, Time } from '@internationalized/date';
import { AriaTimeFieldProps, useTimeField } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { TimeFieldStateOptions, useTimeFieldState } from '@react-stately/datepicker';
import type { TimeValue } from '@react-types/datepicker';

import { useField, useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { UseFieldProps } from '../../hooks/useField/useField';
import { Box, Label } from '../../index';
import { TimeFieldProps } from '../../types';

import TimeSegment from './TimeSegment';

export const parseTimeIfString = (value: TimeValue | string): TimeValue | Time => {
  return typeof value === 'string' ? parseTime(value) : value;
};

const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>((props, ref) => {
  const { className, isDisabled, isReadOnly, ...others } = props;
  const { locale } = useLocale();

  const timeFieldRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  const fieldRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const parsedTimes = {
    value: props.value && parseTimeIfString(props.value),
    defaultValue:
      (props.defaultValue ? parseTimeIfString(props.defaultValue) : new Time()) as TimeValue,
    placeholderValue: props.placeholderValue && parseTimeIfString(props.placeholderValue),
    minValue: props.minValue && parseTimeIfString(props.minValue),
    maxValue: props.maxValue && parseTimeIfString(props.maxValue),
  };

  const state = useTimeFieldState({
    ...props,
    ...parsedTimes,
    locale,
  } as TimeFieldStateOptions);

  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isReadOnly,
    is24Hour: props.hourCycle === 24,
  });

  const { fieldProps } = useTimeField(
    { ...props, ...parsedTimes } as AriaTimeFieldProps<TimeValue>,
    state,
    fieldRef,
  );

  const {
    fieldContainerProps,
    fieldLabelProps,
  } = useField({
    ...others,
    value: state?.value?.toString() || '',
  } as UseFieldProps<TimeFieldProps>);

  return (
    <Box
      variant="forms.input.fieldContainer"
      {...fieldContainerProps}
      ref={timeFieldRef}
    >
      <Label {...fieldLabelProps} ref={labelRef} />
      <Box
        isRow
        variant="forms.input.fieldControlWrapper"
        className={classNames}
      >
        <Box
          isRow
          variant="forms.timeField.inputField"
          {...fieldProps}
          ref={fieldRef}
          className={classNames}
          role="group"
        >
          <FocusScope>
            {state.segments.map((segment, i) => {
              return (
                <TimeSegment
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  segment={segment}
                  state={state}
                  segments={state.segments}
                  segmentIndex={i}
                />
              );
            })}
          </FocusScope>
        </Box>
      </Box>
    </Box>
  );
});

export default TimeField;
