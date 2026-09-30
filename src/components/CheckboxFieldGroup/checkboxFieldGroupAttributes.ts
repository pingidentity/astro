import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export const checkboxFieldGroupArgTypes = {
  label: {
    control: {
      type: 'text',
    },
    description: 'The accessible label for the checkbox group.',
  },
  helperText: {
    control: {
      type: 'text',
    },
    description: 'Descriptive text announced with the group and its items.',
  },
  errorMessage: {
    control: {
      type: 'text',
    },
    description: 'Validation feedback rendered when the group is invalid.',
  },
  hintText: {
    control: {
      type: 'text',
    },
  },
  orientation: {
    control: {
      type: 'inline-radio',
    },
    options: ['vertical', 'horizontal'],
  },
  defaultValue: {
    control: {
      type: 'object',
    },
    description: 'Initially selected item values for an uncontrolled group.',
  },
  value: {
    control: false,
    description: 'Selected item values for a controlled group.',
  },
  onChange: {
    action: 'selection changed',
    description: 'Receives the complete selected string array after a toggle.',
  },
  isDisabled: {},
  isReadOnly: {},
  isRequired: {},
  isInvalid: {},
  name: {
    description: 'The native name copied to every checkbox input in the group.',
  },
  form: {
    description: 'The native form ID copied to every checkbox input in the group.',
  },
  id: {},
  children: {
    control: false,
    description: 'Use CheckboxFieldGroupItem children; raw Checkbox children do not consume group state.',
  },
  ...statusArgTypes,
  ...ariaAttributeBaseArgTypes,
  ...inputFieldAttributeBaseArgTypes,
};

export const checkboxFieldGroupItemArgTypes = {
  value: {
    description: 'Required string submitted when this item is selected.',
  },
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
  isDisabled: {},
  isReadOnly: {},
  isIndeterminate: {
    description: 'Visual mixed state only; it does not add another selection model.',
  },
  hasAutoFocus: {},
  controlProps: {
    control: false,
  },
  checkBoxProps: {
    control: false,
  },
  ...statusArgTypes,
  ...ariaAttributeBaseArgTypes,
};
