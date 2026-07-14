import { booleanArg, funcArg } from '../../utils/docUtils/docArgTypes';

export const timeFieldArgTypes = {
  isDisabled: {
    ...booleanArg,
    description: 'Whether the input is disabled.',
  },
  isReadOnly: {
    ...booleanArg,
    description: 'Whether the input can be selected but not changed by the user.',
  },
  isRequired: {
    ...booleanArg,
    description: 'Whether user input is required on the input before form submission.',
  },
  isInvalid: {
    ...booleanArg,
    description: 'Whether the input value is invalid.',
  },
  autoFocus: {
    ...booleanArg,
    description: 'Whether the element should receive focus on render.',
  },
  shouldForceLeadingZeros: {
    ...booleanArg,
    description: 'Whether to always show leading zeros in the hour field.',
  },
  hourCycle: {
    control: { type: 'select' },
    options: [12, 24],
    description: 'Whether to display the time in 12 or 24 hour format. Default is determined by the user\'s locale.',
  },
  granularity: {
    control: { type: 'select' },
    options: ['hour', 'minute', 'second'],
    description: 'Determines the smallest unit that is displayed in the time picker.',
  },
  validationBehavior: {
    control: { type: 'select' },
    options: ['native', 'aria'],
    description: 'Whether to use native HTML form validation or ARIA to mark the field as required or invalid.',
  },
  label: {
    control: { type: 'text' },
    description: 'The content to display as the label.',
  },
  name: {
    control: { type: 'text' },
    description: 'The name of the input element, used when submitting an HTML form.',
  },
  id: {
    control: { type: 'text' },
    description: 'The element\'s unique identifier.',
  },
  slot: {
    control: { type: 'text' },
    description: 'A slot name for the component, allowing it to receive props from a parent component.',
  },
  value: {
    control: { type: null },
    description: 'The current value (controlled). Accepts a TimeValue, string, or null.',
  },
  defaultValue: {
    control: { type: null },
    description: 'The default value (uncontrolled). Accepts a TimeValue, string, or null.',
  },
  placeholderValue: {
    control: { type: null },
    description: 'A placeholder time that influences the format of the placeholder shown when no value is selected.',
  },
  minValue: {
    control: { type: null },
    description: 'The minimum allowed time that a user may select.',
  },
  maxValue: {
    control: { type: null },
    description: 'The maximum allowed time that a user may select.',
  },
  onChange: {
    ...funcArg,
    description: 'Handler that is called when the value changes.',
  },
  onFocus: {
    ...funcArg,
    description: 'Handler that is called when the element receives focus.',
  },
  onBlur: {
    ...funcArg,
    description: 'Handler that is called when the element loses focus.',
  },
  onFocusChange: {
    ...funcArg,
    description: 'Handler that is called when the element\'s focus status changes.',
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
