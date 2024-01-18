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

export default {
  container,
  interactive,
};
