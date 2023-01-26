import { defaultFocus } from '../Button/Buttons.styles';

const copy = {
  alignItems: 'center',
  wordBreak: 'break-all',
  overflowWrap: 'break-word',
  '& .is-focused': {
    outline: '1px solid',
    outlineColor: 'active',
    outlineOffset: '4px',
    borderRadius: '4px',
  },
  '& span': {
    cursor: 'text',
  },
};

export const copyButton = {
  ml: 'xs',
  outline: 'none',
  height: 'auto',
  cursor: 'pointer',
  path: {
    fill: 'neutral.10',
  },
  '&.is-focused': {
    boxShadow: 'none',
    ...defaultFocus,
  },
  ':focus': {
    outline: 'none',
  },
};

export default {
  copy,
  copyButton,
};
