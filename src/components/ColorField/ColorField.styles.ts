import { neutral } from '../../styles/colors';
import ButtonsStyles, { defaultFocus } from '../Button/Buttons.styles';

const container = {
  border: `1px solid ${neutral['80']}`,
  '&:focus-visible': {
    outline: 'none',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

const detailedColorView = {
  height: '28px',
  width: '28px',
  borderRadius: '1px',
};

const detailedPreviewButton = {
  ...ButtonsStyles.default,
  height: '52px !important',
  minWidth: '240px',
  borderColor: 'neutral.90',
  '&.is-focused': {
    boxShadow: '0 1px 3px 0px rgba(0,0,0, 0.13)',
  },
  '&.is-pressed': {
    backgroundColor: 'accent.30',
    color: 'white',
    boxShadow: 'unset',
    'path': {
      fill: 'white',
    },
  },
  '&.is-disabled': {
    ...defaultFocus,
  },
};

export default {
  container,
  detailedPreviewButton,
  detailedColorView,
};
