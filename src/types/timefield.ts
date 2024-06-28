import React, { FocusEvent, KeyboardEvent } from 'react';
import { CalendarDateTime, Time, ZonedDateTime } from '@internationalized/date';
import type { DateSegment, TimeFieldState } from '@react-stately/datepicker';
import type { TimeValue } from '@react-types/datepicker';

import { DOMAttributes, StyleProps } from './shared';

export type HourCycle = 12 | 24;
export type Granularity = 'hour' | 'minute' | 'second';
export type ValidationBehavior = 'native' | 'aria';

export type MappedTimeValue<T> =
  T extends ZonedDateTime ? ZonedDateTime :
  T extends CalendarDateTime ? CalendarDateTime :
  T extends Time ? Time :
  never;


export interface TimeFieldProps extends StyleProps, DOMAttributes{
  /** Whether to display the time in 12 or 24 hour format. Default is determined by user's locale */
  hourCycle?: HourCycle;

  /** Determines the smallest unit that is displayed in the time picker. */
  granularity?: Granularity;

  /** Whether to always show leading zeros in the hour field. */
  shouldForceLeadingZeros?: boolean;

  /** A placeholder time that influences the format of
   the placeholder shown when no value is selected. */
  placeholderValue?: TimeValue | string;

  /** The minimum allowed time that a user may select. */
  minValue?: TimeValue | string;

  /** The maximum allowed time that a user may select. */
  maxValue?: TimeValue | string;

  /** Whether the input is disabled. */
  isDisabled?: boolean;

  /** Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean;

  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;

  /** Whether the input value is invalid. */
  isInvalid?: boolean;

  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;

  /** The current value (controlled). */
  value?: TimeValue | string | null;

  /** The default value (uncontrolled). */
  defaultValue?: TimeValue | string | null;

  /** The name of the input element, used when submitting an HTML form. */
  name?: string;

  /** Whether to use native HTML form validation to prevent form submission
   when the value is missing or invalid, or mark the field as required or invalid via ARIA. */
  validationBehavior?: ValidationBehavior;

  /** The content to display as the label. */
  label?: React.ReactNode,

  /** Handler that is called when the element receives focus. */
  onFocus?: (e: FocusEvent) => void;

  /** Handler that is called when the element loses focus. */
  onBlur?: (e: FocusEvent) => void;

  /** Handler that is called when the element's focus status changes. */
  onFocusChange?: (isFocused: boolean) => void;

  /** Handler that is called when a key is pressed. */
  onKeyDown?: (e: KeyboardEvent) => void;

  /** Handler that is called when a key is released. */
  onKeyUp?: (e: KeyboardEvent) => void;

  /** Handler that is called when the value changes. */
  onChange?: (value: MappedTimeValue<TimeValue>) => void;

  /** A slot name for the component. Slots allow the component to receive props from a parent
   * component. An explicit null value indicates that the local props completely
   * override all props received from a parent. */
  slot?: string | null;

  /** The element's unique identifier. */
  id?: string;
}

export interface TimeSegmentProps {
  state: TimeFieldState;
  segment: DateSegment;
  segments: DateSegment[];
  segmentIndex: number;
}
