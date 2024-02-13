import { base, defaultFocus } from '../Button/Buttons.styles';

const title = {
  display: 'inline-block !important',
  overflowWrap: 'break-word',
  maxWidth: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  fontSize: 'lg',
  fontWeight: 700,
  color: 'text.primary',
  '&.is-pressed': {
    color: 'white',
  },
};

const accordion = {
  display: 'flex',
  mt: '5px',
  mb: '20px',
  alignItems: 'flex-start',
};

const body = {
  display: 'none',
  pt: 'md',
  width: '100%',
  '.is-open &': {
    display: 'flex',
  },
};

export const hoveredState = {
  '&.is-hovered': {
    color: 'active',
  },

};

const header = {
  ...base,
  display: 'inline-flex',
  bg: 'transparent',
  color: 'neutral.10',
  padding: '0 5px',
  flexGrow: 0,
  fontWeight: 700,
  '&.is-pressed': {
    color: 'accent.20',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
  ...hoveredState,
};

export default {
  title,
  accordion,
  body,
  header,
};
