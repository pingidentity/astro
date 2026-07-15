import { modes } from '../../utils/devUtils/constants/labelModes';

export const labelArgTypes = {
  mode: {
    control: {
      type: 'select',
      options: modes,
    },
  },
  isDisabled: {},
  isRequired: {},
  requiredIndicator: {
    control: 'none',
  },
};
