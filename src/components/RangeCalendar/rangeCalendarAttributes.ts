import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { booleanArg, funcArg } from '../../utils/docUtils/docArgTypes';

export const rangeCalendarArgTypes = {
  ...ariaAttributeBaseArgTypes,
  defaultValue: {
    control: { type: null },
    description: 'The default selected date range (uncontrolled).',
  },
  value: {
    control: { type: null },
    description: 'The currently selected date range (controlled).',
  },
  customWeekDays: {
    control: { type: null },
    description: 'Custom week day labels for use with non-Gregorian calendars.',
  },
  defaultFocusedValue: {
    control: { type: 'text' },
    description: 'The default focused date when the calendar first mounts (uncontrolled).',
  },
  minValue: {
    control: { type: 'text' },
    description: 'The minimum allowed date that a user may select.',
  },
  maxValue: {
    control: { type: 'text' },
    description: 'The maximum allowed date that a user may select.',
  },
  isDisabled: {
    ...booleanArg,
    description: 'Whether the calendar is disabled.',
  },
  isReadOnly: {
    ...booleanArg,
    description: 'Whether the calendar dates are only focusable (not selectable).',
  },
  isRequired: {
    ...booleanArg,
    description: 'Whether user input is required on the calendar before form submission.',
  },
  hasAutoFocus: {
    ...booleanArg,
    description: 'Whether the element should receive focus on render.',
  },
  onChange: {
    ...funcArg,
    description: 'Handler that is called when the selected date range changes.',
  },
  isDateUnavailable: {
    ...funcArg,
    description: 'Callback that is called for each date. If it returns true, the date is unavailable.',
  },
  onBlur: {
    ...funcArg,
    description: 'Handler that is called when the element loses focus.',
  },
  onFocus: {
    ...funcArg,
    description: 'Handler that is called when the element receives focus.',
  },
  onFocusChange: {
    ...funcArg,
    description: "Handler that is called when the element's focus status changes.",
  },
  onKeyDown: {
    ...funcArg,
    description: 'Handler that is called when a key is pressed.',
  },
  onKeyUp: {
    ...funcArg,
    description: 'Handler that is called when a key is released.',
  },
};
