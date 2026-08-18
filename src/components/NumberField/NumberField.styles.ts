import { ThemeUICSSObject } from 'theme-ui';

import statuses from '../../utils/devUtils/constants/statuses';
import { input } from '../Input/Input.styles';

const sharedStyles = {
  WebkitAppearance: 'none',
  margin: 0,
};

const noDefaultArrows = {
  'input::-webkit-outer-spin-button': { ...sharedStyles },
  'input::-webkit-inner-spin-button': {
    ...sharedStyles,
  },
  'input[type=number]': {
    MozAppearance: 'textfield',
  },
};

const arrowsWrapper: ThemeUICSSObject = {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  ...(input.fieldControlWrapper as object),
  [`&.is-${statuses.ERROR}::after`]: {
    bg: 'critical.bright',
  },
  [`&.is-${statuses.SUCCESS}::after`]: {
    bg: 'success.bright',
  },
  [`&.is-${statuses.WARNING}::after`]: {
    bg: 'warning.bright',
  },
};

const arrows: ThemeUICSSObject = {
  position: 'absolute',
  right: '10px',
};

export default {
  arrowsWrapper,
  arrows,
  noDefaultArrows,
};
