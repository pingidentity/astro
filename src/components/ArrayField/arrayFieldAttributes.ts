import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

export const arrayFieldArgTypes = {
  label: {
    control: { type: 'text' },
  },
  helperText: {
    control: { type: 'text' },
  },
  addButtonLabel: {
    control: { type: 'text' },
  },
  maxSize: {
    control: { type: 'text' },
  },
  maxSizeText: {
    control: { type: 'text' },
  },
  ...ariaAttributeBaseArgTypes,
};
