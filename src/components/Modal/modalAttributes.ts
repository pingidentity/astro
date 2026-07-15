import { modalSizes } from '../../utils/devUtils/constants/modalSizes';

export const modalArgTypes = {
  title: {
    control: {
      type: 'text',
    },
  },
  role: {},
  id: {
    control: {
      type: 'text',
    },
  },
  size: {
    control: {
      type: 'select',
      options: modalSizes,
    },
  },
  hasCloseButton: {
  },
  isClosedOnBlur: {},
  isDismissable: {},
  isKeyboardDismissDisabled: {},
  'aria-label': {
    control: {
      type: 'text',
    },
  },
  'aria-labelledby': {
    control: {
      type: 'text',
    },
  },
  'aria-describedby': {
    control: {
      type: 'text',
    },
  },
  'aria-details': {
    control: {
      type: 'text',
    },
  },
  closeButton: {
    control: false,
  },
  isOpen: {
    control: false,
  },
  contentProps: {
    control: false,
  },
  containerProps: {
    control: false,
  },
};
