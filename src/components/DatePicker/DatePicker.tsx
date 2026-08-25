import React, { forwardRef, useRef } from 'react';
import { parseDate } from '@internationalized/date';
import { useDatePicker } from '@react-aria/datepicker';
import { FocusScope } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useDatePickerState } from '@react-stately/datepicker';
import { omit } from 'lodash/object';

import { Calendar, FieldHelperText } from '../../index';
import type { DatePickerProps, DateValue } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { isDateWithinRanges } from '../../utils/devUtils/props/isDateWithinRanges';
import Popover from '../Popover/Popover';

import DateField from './DateField';

/**
 * Console Warning: The state update warning is a known issue coming from the react-aria library.
 * The `is-selected` class is added to the button after the component unmounts.
 */

/**
 * Parse a prop that may be a DateValue object or a date string.
 * Strings are parsed with parseDate.
 */
const parseDateProp = (val: DateValue | string | undefined) => {
  if (!val) return undefined;
  return typeof val === 'string' ? parseDate(val) : val;
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const {
    defaultValue,
    hasAutoFocus,
    helperText,
    helpHintProps,
    isDefaultOpen,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    maxValue,
    minValue,
    status,
    value,
    unavailableRanges,
    fieldControlProps,
    calendarWrapperProps,
  } = props;

  const groupRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  /**
   *  This function is run against each date in the calendar
   */
  const isDateUnavailable = (date: DateValue) => {
    return isDateWithinRanges(date, unavailableRanges as [string, string][]);
  };

  /**
   * To accept date value as an object or as a string in format YYYY-MM-DD
   */
  const parsedDates = {
    value: parseDateProp(value),
    defaultValue: parseDateProp(defaultValue),
    maxValue: parseDateProp(maxValue),
    minValue: parseDateProp(minValue),
    isDateUnavailable: unavailableRanges ? isDateUnavailable : undefined,
  };

  const state = useDatePickerState({
    autoFocus: hasAutoFocus,
    defaultOpen: isDefaultOpen,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...mergeProps(props as any, parsedDates),
  });

  const {
    buttonProps,
    calendarProps,
    dialogProps,
    fieldProps,
    groupProps,
    labelProps,
  } = useDatePicker(
    {
      autoFocus: hasAutoFocus,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...mergeProps(props as any, parsedDates),
    },
    state,
    groupRef,
  );

  const calendar = !isReadOnly && (
    <Popover
      hasNoArrow
      isDismissable
      isNonModal
      popoverRef={popoverRef}
      triggerRef={groupRef}
      state={state}
      offset={15}
      crossOffset={40}
      data-testid="popover-container"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ overflow: 'auto' } as any)}
    >
      <FocusScope
        autoFocus
        contain
        restoreFocus
      >
        <div {...dialogProps}>
          <Calendar
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(calendarProps as any)}
            calendarWrapperProps={calendarWrapperProps}
          />
        </div>
      </FocusScope>
    </Popover>
  );

  return (
    <>
      <DateField
        {...getPendoID('DatePicker')}
        {...props}
        ref={ref}
        buttonProps={buttonProps}
        fieldProps={fieldProps}
        groupProps={omit(groupProps, 'data-pendo-id')}
        fieldControlProps={fieldControlProps}
        groupRef={groupRef}
        helperText={helperText}
        labelProps={labelProps}
        isOpen={state.isOpen}
        status={status}
        datePickerState={state}
        helpHintProps={helpHintProps}
      />
      {calendar}
      {helperText && (
        <FieldHelperText status={status}>{helperText}</FieldHelperText>
      )}
    </>
  );
});

export default DatePicker;
