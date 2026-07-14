import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export const checkboxFieldArgTypes = {
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
  name: {},
  id: {
    control: {
      type: 'text',
    },
  },
  value: {},
  isRequired: {},
  isDisabled: {},
  isReadOnly: {},
  hasAutoFocus: {},
  isIndeterminate: {},
  isDefaultSelected: {},
  isSelected: {},
  ...statusArgTypes,
  ...ariaAttributeBaseArgTypes,
  ...inputFieldAttributeBaseArgTypes,
};
