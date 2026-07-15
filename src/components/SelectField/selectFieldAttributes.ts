import { modes as labelModes } from '../../utils/devUtils/constants/labelModes';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export const selectFieldArgTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  placeholder: {},
  defaultText: {},
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
  labelMode: {
    control: {
      type: 'select',
      options: Object.values(labelModes),
    },
  },
  defaultSelectedKey: {},
  disabledKeys: {},
  name: {},
  align: {},
  direction: {},
  hasNoEmptySelection: {},
  isDefaultOpen: {},
  isDisabled: {},
  isOpen: {},
  isRequired: {},
  selectedKey: {
    control: false,
  },
  ...statusArgTypes,
  ...ariaAttributeBaseArgTypes,
  ...inputFieldAttributeBaseArgTypes,
};
