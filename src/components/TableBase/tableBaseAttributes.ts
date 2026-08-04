import { booleanArg, funcArg } from '../../utils/docUtils/docArgTypes';

export const tableBaseArgTypes = {
  selectionMode: {
    description: 'The type of selection allowed in the table.',
    control: { type: 'select' },
    options: ['none', 'single', 'multiple'],
  },
  selectionBehavior: {
    description: 'How selection behaves when clicking rows — replace the current selection or toggle individual rows.',
    control: { type: 'select' },
    options: ['replace', 'toggle'],
  },
  hasSelectionCheckboxes: {
    ...booleanArg,
    description: 'Whether selection checkboxes are shown in each row and the header.',
  },
  isStickyHeader: {
    ...booleanArg,
    description: 'Whether the table header remains fixed when the table body scrolls.',
  },
  isLastColumnSticky: {
    ...booleanArg,
    description: 'Whether the last column is sticky and remains visible during horizontal scroll.',
  },
  caption: {
    description: 'An accessible caption or label for the table.',
    control: { type: 'text' },
  },
  'aria-label': {
    description: 'Defines an accessible label for the table element.',
    control: { type: 'text' },
  },
  onSortChange: {
    ...funcArg,
    description: 'Callback invoked when the sort descriptor changes.',
  },
  onSelectionChange: {
    ...funcArg,
    description: 'Callback invoked when the selection state changes.',
  },
  onRowAction: {
    ...funcArg,
    description: 'Callback fired when a row is pressed (pointer or Enter key), receiving the key of the pressed row.',
  },
};
