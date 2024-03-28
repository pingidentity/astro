import { Key } from 'react';
import type { CalendarDate, CalendarDateTime, ZonedDateTime } from '@internationalized/date';
import { type CalendarState } from '@react-stately/calendar';

import { DOMAttributes } from './shared/dom';
import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime;

type calendarGridStateProps = CalendarState

export interface RangeValue<T> {
  /** The start value of the range. */
  start: T,
  /** The end value of the range. */
  end: T
}

export interface CalendarProps extends BoxProps, TestingAttributes {
  /** Prop to provide a custom default date (uncontrolled) */
  defaultValue?: DateValue | string;
  /** Prop to provide a custom default focused date (uncontrolled) */
  defaultFocusedValue?: DateValue;
  /** Prop to provide a default date (controlled) */
  value?: DateValue | string;
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
  isDateUnavailable?: (date: CalendarDate) => boolean;
  /** Whether the calendar is disabled. */
  isDisabled?: boolean;
  /** Whether the calendar dates are only focusable. */
  isReadOnly?: boolean;
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue | string;
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue | string;
  /** Handler that is called when the element loses focus. */
  onBlur?: () => void;
  /** Handler that is called when the element's selection state changes. */
  onChange?: () => void;
  /** Handler that is called when the element receives focus. */
  onFocus?: () => void;
  /** Handler that is called when the element's focus status changes. */
  onFocusChange?: () => void;
  /** Handler that is called when a key is pressed. */
  onKeyDown?: () => void;
  /** Handler that is called when a key is released. */
  onKeyUp?: () => void;
}

export interface CalendarGridProps {
  /** State object that is passed in from the  useCalendar hook */
  state: calendarGridStateProps;
  /** Custom week days for other international calendars */
  customWeekDays?: Array<string>;
}

export interface CalendarCellProps extends DOMAttributes {
  state: calendarGridStateProps;
  date: object;
  key?: Key,
}
