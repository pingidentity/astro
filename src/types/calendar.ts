import { Key } from 'react';
import type {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from '@internationalized/date';
import {
  type CalendarState,
  type RangeCalendarState,
} from '@react-stately/calendar';
import type { AriaButtonProps } from '@react-types/button';
import type { DOMAttributes as AriaDOMAttributes } from '@react-types/shared';

import { DOMAttributes } from './shared/dom';
import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime;

type calendarGridStateProps = CalendarState | RangeCalendarState;

type MappedDateValue<T> =
  T extends ZonedDateTime ? ZonedDateTime :
  T extends CalendarDateTime ? CalendarDateTime :
  T extends CalendarDate ? CalendarDate :
  never;

export interface RangeValue<T> {
  /** The start value of the range. */
  start: T,
  /** The end value of the range. */
  end: T
}

export type StringOrRangeValue = RangeValue<DateValue> | { start: string, end: string };

export interface CalendarBaseProps extends BoxProps, TestingAttributes {
  /** Prop to provide a custom default focused date (uncontrolled) */
  defaultFocusedValue?: DateValue | string;
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue | string;
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue | string;
  /** custom week days for other calendars */
  customWeekDays?: string[];
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean;
  /** The element's unique identifier. */
  id?: string;
  /**
   * Callback that is called for each date of the calendar.
   * If it returns true, then the date is unavailable.
   *
   * (date?: DateValue) => boolean
   */
  isDateUnavailable?: (date: DateValue) => boolean;
  /** Whether the calendar is disabled. */
  isDisabled?: boolean;
  /** Whether the calendar dates are only focusable. */
  isReadOnly?: boolean;
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  /** Handler that is called when the element loses focus. */
  onBlur?: () => void;
  /** Handler that is called when the element receives focus. */
  onFocus?: () => void;
  /** Handler that is called when the element's focus status changes. */
  onFocusChange?: (date: CalendarDate) => void;
  /** Handler that is called when a key is pressed. */
  onKeyDown?: () => void;
  /** Handler that is called when a key is released. */
  onKeyUp?: () => void;
}

export interface CalendarProps extends Omit<CalendarBaseProps, 'onChange'> {
  /** Prop to provide a custom default date (uncontrolled) */
  defaultValue?: DateValue | string;
  /** Prop to provide a custom default focused date (uncontrolled) */
  value?: DateValue | string;
    /** Handler that is called when the value changes. */
  onChange?: (value: MappedDateValue<DateValue>) => void;
}

export interface RangeCalendarProps extends Omit<CalendarBaseProps, 'onChange'> {
  /** Prop to provide a custom default date (uncontrolled) */
  defaultValue?: StringOrRangeValue| null;
  /** The currently selected date range. */
  value?: StringOrRangeValue | null;
    /** Handler that is called when the value changes. */
  onChange?: (value: RangeValue<MappedDateValue<DateValue>>) => void;
}

export interface RangeCalendarHeaderProps {
  state: RangeCalendarState,
  calendarProps: AriaDOMAttributes,
  prevButtonProps: AriaButtonProps,
  nextButtonProps: AriaButtonProps,
}

export interface CalendarGridProps {
  /** State object that is passed in from the  useCalendar hook */
  state: calendarGridStateProps;
  /** Custom week days for other international calendars */
  customWeekDays?: Array<string>;
}

export interface RangeCalendarGridProps {
  /** State object that is passed in from the  useRangeCalendar hook */
  state: RangeCalendarState;
  /** The offset to apply to the calendar */
  offset?: object;
}

export interface CalendarCellProps extends DOMAttributes {
  state: calendarGridStateProps;
  date: object;
  key?: Key,
}

export interface RangeCalendarCellProps extends DOMAttributes {
  state: RangeCalendarState;
  date: object;
  key?: Key;
  currentMonth: CalendarDate;
}
