import { htmlElements } from '../../utils/devUtils/constants/htmlElements';

import variants from './Link.styles';

export const linkArgTypes = {
  href: {
    control: {
      type: 'text',
    },
  },
  isDisabled: {},
  isSafariCompatible: {
    table: {
      disable: true,
    },
  },
  as: {
    control: {
      type: 'select',
    },
    options: htmlElements,
  },
  target: {
    control: false,
  },
  variant: {
    control: {
      type: 'select',
      options: [...Object.keys(variants), 'button'],
    },
  },
};
