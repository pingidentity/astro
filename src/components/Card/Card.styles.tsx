import { checkIcon } from '../../utils/devUtils/constants/images';
import { defaultFocus } from '../Button/Buttons.styles';

const container = {
  display: 'flex',
  boxShadow: '0px 1px 14px rgba(37, 55, 70, 0.15)',
  borderRadius: '3px',
  color: 'text.primary',
  fontSize: 'md',
  fontWeight: 0,
  flex: '1 1 0',
  p: 'lg',
};

const interactive = {
  ...container,
  boxShadow: '0px 1px 14px 0px rgba(37, 55, 70, 0.15)',
  '&.is-hovered': {
    bg: 'accent.99',
    cursor: 'pointer',
  },
  '&.is-focused': {
    bg: 'white',
    ...defaultFocus,
  },
  '&.is-pressed': {
    border: '1px solid',
    borderColor: 'active',
    boxShadow: '0 0 0 0 !important',
    outline: 'none',
  },
  ':focus-visible:not(.is-focused)': {
    outline: 'none',
    border: '1px solid',
    borderColor: 'active',
  },
};

export const flat = {
  ...container,
  p: 0,
  boxShadow: '0 1px 3px 0px rgba(0,0,0, 0.13)',
  border: '1px solid',
  borderColor: 'neutral.90',
  borderRadius: '16px',
};

const header = {
  p: 24,
  borderBottom: '1px solid',
  borderBottomColor: 'neutral.90',
};

const footer = {
  borderTop: '1px solid',
  borderTopColor: 'neutral.90',
  p: 24,
};

const body = {
  p: 24,
};

const activeCard = {
  ...interactive,
  position: 'relative',
  cursor: 'pointer',
  '&.is-selected': {
    border: '1px solid',
    borderColor: 'active',
    ':before': {
      content: '""',
      backgroundColor: 'active',
      backgroundImage: `url(${checkIcon})`,
      backgroundSize: '16px 16px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      transition: 'background-image 0.25s ease-in-out',
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
    },
  },
};

export default {
  container,
  interactive,
  header,
  footer,
  flat,
  body,
  activeCard,
};
