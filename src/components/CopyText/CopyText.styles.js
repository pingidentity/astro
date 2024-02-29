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
  mx: 'sm',
  outline: 'none',
  height: 'auto',
  cursor: 'pointer',
  width: 'auto',
  minWidth: '17px',
  path: {
    fill: 'neutral.10',
  },
  ':focus': {
    outline: 'none',
  },
  '&.is-focused': {
    ...defaultFocus,
    boxShadow: 'none',
    outlineOffset: '1px',
  },
};

export default {
  copy,
  copyButton,
};
