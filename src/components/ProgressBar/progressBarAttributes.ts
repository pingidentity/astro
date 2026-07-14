import { booleanArg } from '../../utils/docUtils/docArgTypes';

export const progressBarArgTypes = {
  'data-testid': {
    table: {
      disable: true,
    },
  },
  value: {
    control: { type: 'number' },
    description: 'The current value of the progress bar (required).',
  },
  minValue: {
    control: { type: 'number' },
    description: 'The minimum value of the progress bar.',
  },
  maxValue: {
    control: { type: 'number' },
    description: 'The maximum value of the progress bar.',
  },
  isIndeterminate: {
    ...booleanArg,
    description: 'Whether the progress bar is in an indeterminate state (progress is unknown).',
  },
  shouldShowValueLabel: {
    ...booleanArg,
    description: 'Whether to display a label showing the current value of the progress bar.',
  },
  label: {
    control: { type: 'text' },
    description: 'A label describing the progress bar.',
  },
  valueLabel: {
    control: { type: 'text' },
    description: 'A custom label to display for the current value instead of the default formatted value.',
  },
  formatOptions: {
    description: 'The display format of the value label (Intl.NumberFormatOptions).',
  },
};
