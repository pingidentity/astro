import { ariaAttributeBaseArgTypes, ariaAttributeBaseDocSettings } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';

export const searchFieldArgTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  placeholder: {},
  defaultValue: {},
  icon: {
    control: false,
  },
  isDisabled: {},
  hasAutoFocus: {},
  hasNoClearButton: {},
  autoComplete: {},
  iconProps: {},
  name: {},
  id: {},
  'aria-autocomplete': {
    table: ariaAttributeBaseDocSettings.table,
  },
  value: {
    control: false,
  },
  ...ariaAttributeBaseArgTypes,
  ...inputFieldAttributeBaseArgTypes,
};
