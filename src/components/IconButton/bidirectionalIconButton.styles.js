import { defaultFocus } from '../Button/Buttons.styles';

const bidirectionalIconButton = {
  border: '1px solid',
  outline: 'none',
  height: '24px',
  width: '24px',
  color: 'active',
  borderRadius: '12px',
  borderColor: 'active',
  '&.is-hovered': {
    color: 'accent.40',
    borderColor: 'accent.40',
  },
  '&.is-pressed': {
    color: 'accent.20',
    borderColor: 'accent.20',
  },
  '&.is-focused': {
    ...defaultFocus,
  },
};

export default bidirectionalIconButton;
