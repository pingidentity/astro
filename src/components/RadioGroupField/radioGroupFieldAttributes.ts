import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export const radioGroupFieldArgTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  hintText: {
    control: {
      type: 'text',
    },
  },
  defaultValue: {},
  orientation: {},
  isDisabled: {},
  isRequired: {},
  name: {},
  id: {},
  value: {
    control: false,
  },
  ...statusArgTypes,
  ...ariaAttributeBaseArgTypes,
};
