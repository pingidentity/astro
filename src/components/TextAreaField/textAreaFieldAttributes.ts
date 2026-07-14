import { modes as labelModes } from '../../utils/devUtils/constants/labelModes';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export const textAreaFieldArgTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  labelMode: {
    control: {
      type: 'select',
      options: Object.values(labelModes),
    },
  },
  defaultValue: {},
  placeholder: {},
  name: {},
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
  rows: {},
  isDisabled: {},
  isRequired: {},
  isReadOnly: {},
  hasAutoFocus: {},
  isUnresizable: {},
  id: {},
  autocomplete: {},
  className: {},
  value: {
    control: false,
  },
  ...statusArgTypes,
  ...ariaAttributeBaseArgTypes,
  ...inputFieldAttributeBaseArgTypes,
};
