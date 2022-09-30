import { defaultFocus } from '../Button/Buttons.styles';

export const label = {
  alignItems: 'center',
  fontSize: 'md',
  color: 'text.primary',
};

export const container = {
  mr: 5,
  cursor: 'pointer',
};

export const thumbContainer = {
  appearance: 'none',
  m: 0,
  p: 0,
  width: 42,
  height: 22,
  color: 'neutral.80',
  bg: 'neutral.80',
  border: '1px solid',
  borderColor: 'neutral.80',
  borderRadius: 9999,
  'label.is-selected &': {
    bg: 'active',
    borderColor: 'active',
  },
  'label.is-focused &, &:focus': {
    ...defaultFocus,
  },
};

export const thumb = {
  width: 20,
  height: 22,
  borderRadius: 9999,
  border: '1px solid',
  borderColor: 'neutral.80',
  bg: 'white',
  boxShadow: 'standard',
  transitionProperty: 'transform',
  transitionTimingFunction: 'ease-out',
  transitionDuration: '0.1s',
  transform: 'translateX(0)',
  'label.is-selected &': {
    transform: 'translateX(20px)',
    borderColor: 'active',
  },
};
