import { colors } from '../colors';

const comboBox = {
  input: {
    bg: 'gray[900]',
    '&.is-disabled, &.is-read-only': {
      bg: `${colors.disabled} !important`,
    },
  },
};

export default comboBox;
