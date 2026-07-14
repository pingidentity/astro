import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export const colorFieldArgTypes = {
  value: {
    control: {
      type: 'text',
    },
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
  buttonProps: {
    control: false,
  },
  containerProps: {
    control: false,
  },
  ...statusArgTypes,
  ...ariaAttributeBaseArgTypes,
  ...inputFieldAttributeBaseArgTypes,
};
