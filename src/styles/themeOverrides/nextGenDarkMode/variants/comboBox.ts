import { astroTokensDark } from '@pingux/onyx-tokens';

import { colors } from '../colors';

const comboBox = {
  inputInContainerSlot: {
    right: astroTokensDark.spacing.input['padding-x'],
  },
  input: {
    bg: 'gray[900]',
    '&.is-disabled, &.is-read-only': {
      bg: `${colors.disabled} !important`,
    },
  },
};

export default comboBox;
