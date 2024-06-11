import { neutral } from '../../styles/colors';
import { defaultFocus } from '../Button/Buttons.styles';

const container = {
  border: `1px solid ${neutral['80']}`,
  '&:focus-visible': {
    outline: 'none',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

export default {
  container,
};
