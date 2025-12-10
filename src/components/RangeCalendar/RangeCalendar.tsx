import React, { forwardRef } from 'react';
import { createCalendar, DateValue, parseDate } from '@internationalized/date';
import { AriaRangeCalendarProps, CalendarAria, useRangeCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { type RangeCalendarState, type RangeCalendarStateOptions, useRangeCalendarState } from '@react-stately/calendar';

import { useLocalOrForwardRef } from '../../hooks';
import { Box } from '../../index';
import { RangeCalendarProps, RangeValue, StringOrRangeValue } from '../../types';

import RangeCalendarGrid from './RangeCalendarGrid';
import RangeCalendarHeader from './RangeCalendarHeader';

export const parseDateIfString = (value: DateValue | string): DateValue => {
  return typeof value === 'string' ? parseDate(value) : value;
};

export const parseDateRangeIfString = (value: StringOrRangeValue): RangeValue<DateValue> => {
  const start = parseDateIfString(value.start);
  const end = parseDateIfString(value.end);

  return { start, end };
};


const RangeCalendar = forwardRef<HTMLDivElement, RangeCalendarProps>((props, ref) => {
  const {
    defaultFocusedValue,
    defaultValue,
    hasAutoFocus,
    maxValue,
    minValue,
    value,
  } = props;
  const { locale } = useLocale();

  const calenderRangeRef = useLocalOrForwardRef<HTMLDivElement>(ref);


  const parsedDates = {
    value: value && parseDateRangeIfString(value),
    defaultValue: defaultValue && parseDateRangeIfString(defaultValue),
    defaultFocusedValue: defaultFocusedValue && parseDateIfString(defaultFocusedValue),
    maxValue: maxValue && parseDateIfString(maxValue),
    minValue: minValue && parseDateIfString(minValue),
  };

  const state: RangeCalendarState = useRangeCalendarState({
    autoFocus: hasAutoFocus,
    ...props,
    ...parsedDates,
    visibleDuration: { months: 2 },
    pageBehavior: 'single',
    locale,
    createCalendar,
  } as RangeCalendarStateOptions);

  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(
    { ...props, ...parsedDates } as AriaRangeCalendarProps<DateValue>,
    state,
    calenderRangeRef,
  ) as CalendarAria;

  return (
    <Box {...calendarProps} ref={calenderRangeRef} variant="rangeCalendar.calendarContainer" role="group">
      <RangeCalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <Box isRow gap="26px">
        <RangeCalendarGrid state={state} />
        <RangeCalendarGrid state={state} offset={{ months: 1 }} />
      </Box>
    </Box>
  );
});

export default RangeCalendar;
