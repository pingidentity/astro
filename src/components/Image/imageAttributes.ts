import { htmlElements } from '../../utils/devUtils/constants/htmlElements';

export const imageArgTypes = {
  isDisabled: {},
  variant: {
    control: false,
  },
  as: {
    control: {
      type: 'select',
    },
    options: htmlElements,
  },
  src: {
    control: false,
  },
};
