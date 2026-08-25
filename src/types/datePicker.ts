import React from 'react';
import type {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from '@internationalized/date';
import type { DateFieldState, DatePickerState, DateSegment } from '@react-stately/datepicker';
import type { AriaButtonProps } from '@react-types/button';

import type { BoxProps } from './box';
import type { DateValue } from './calendar';

type MappedDateValue<T> =
  T extends ZonedDateTime ? ZonedDateTime :
  T extends CalendarDateTime ? CalendarDateTime :
  T extends CalendarDate ? CalendarDate :
  never;

export type { CalendarDate, DateValue, MappedDateValue };

export interface DatePickerProps {
  /** Prop to provide a custom default date (uncontrolled) */
  defaultValue?: DateValue | string;
  /** Prop to provide a default date (controlled) */
  value?: DateValue | string;
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean;
  /** Text rendered below the input displaying the expected date format for the user's locale. */
  hasFormatHelpText?: boolean;
  /** Text rendered below the input. */
  helperText?: string;
  /** Props object that is spread directly into the helphint element. */
  helpHintProps?: BoxProps;
  /** The element's unique identifier. */
  id?: string;
  /**
   * Callback that is called for each date of the calendar.
   * If it returns true, then the date is unavailable.
   *
   * (date: DateValue) => boolean
   */
  isDateUnavailable?: (date: DateValue) => boolean;
  /** Sets the default open state of the overlay (uncontrolled). */
  isDefaultOpen?: boolean;
  /** Whether the calendar is disabled. */
  isDisabled?: boolean;
  /** Whether the overlay is currently open (controlled). */
  isOpen?: boolean;
  /** Whether the calendar dates are only focusable. */
  isReadOnly?: boolean;
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  /** The rendered label for the field. */
  label?: React.ReactNode;
  /** The maximum allowed date that a user may select. */
  maxValue?: DateValue | string;
  /** The minimum allowed date that a user may select. */
  minValue?: DateValue | string;
  /** Handler that is called when the element loses focus. */
  onBlur?: () => void;
  /** Handler that is called when the element's selection state changes. */
  onChange?: (value: MappedDateValue<DateValue>) => void;
  /** Handler that is called when the element receives focus. */
  onFocus?: () => void;
  /** Handler that is called when the element's focus status changes. */
  onFocusChange?: (date: CalendarDate) => void;
  /** Handler that is called when a key is pressed. */
  onKeyDown?: (e: KeyboardEvent) => void;
  /** Handler that is called when a key is released. */
  onKeyUp?: (e: KeyboardEvent) => void;
  /** Determines the textarea status indicator and helper text styling. */
  status?: 'default' | 'error' | 'success' | 'warning';
  /** The ranges of unavailable dates passed */
  unavailableRanges?: [string, string][];
  /** Props object that spread into date segment wrapper element. */
  fieldControlProps?: BoxProps;
  /** Props object that spread into calendar element. */
  calendarWrapperProps?: BoxProps;
}

export interface DateFieldProps extends DatePickerProps {
  /** Additional CSS class name(s) applied to the outermost element. */
  className?: string;
  /** Props object that is spread directly into the calendar button element. */
  buttonProps?: AriaButtonProps;
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps?: BoxProps;
  /** State management for a date picker component. */
  datePickerState?: DatePickerState;
  /** @ignore Props object that is spread directly into the segmented date field. */
  fieldProps?: object;
  /** @ignore Props passed to the box surrounding the input, button, and helper text. */
  groupProps?: BoxProps;
  /** @ignore Ref which is passed to the role="group" element. */
  groupRef?: React.RefObject<HTMLElement>;
  /** Props object that is spread directly into the label element. */
  labelProps?: object;
  /** Props object that is spread directly into the input wrapper element. */
  wrapperProps?: BoxProps;
  /** Whether the field is quiet. */
  isQuiet?: boolean;
}

export interface DateSegmentProps {
  /** Slot for input that indicates each date segment. */
  segment: DateSegment;
  /** State returned by useDateField. */
  state: DateFieldState;
  /** An array of segments. */
  segments: DateSegment[];
  /** Index value of each segment. */
  segmentIndex: number;
  /**
   * Handler that is called when a paste event is called.
   * (e: React.ClipboardEvent) => void
   */
  handlePaste: (e: React.ClipboardEvent) => void;
  /** Checks if the current locale is en-US. */
  isLocalEnUS: boolean;
  /** Whether the segment is disabled. */
  isDisabled?: boolean;
  /** Whether the segment is read-only. */
  isReadOnly?: boolean;
  /** Whether the segment is required. */
  isRequired?: boolean;
}
