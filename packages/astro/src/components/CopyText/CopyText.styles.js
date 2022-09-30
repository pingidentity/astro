import { defaultFocus } from '../Button/Buttons.styles';

const copy = {
  alignItems: 'center',
  width: 'max-content',
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

const copyButton = {
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
};

export default {
  copy,
  copyButton,
};
