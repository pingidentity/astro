import { defaultFocus, quiet } from '../Button/Buttons.styles';

export const tab = {
  pt: 10,
  cursor: 'pointer',
  alignItems: 'center',
  display: 'inline-flex',
  outline: 'none',
  transform: 'translateY(1px)',
  '&.is-focused': {
    '& > span': {
      ...defaultFocus,
      borderRadius: '4px',
    },
  },
  '&.is-disabled': {
    cursor: 'default',
  },
  '&.is-selected.is-vertical': {
    bg: 'accent.95',
  },
  '& > svg': {
    flexShrink: 0,
  },
};

export const tabLine = {
  height: '2px',
  width: '100%',
  bg: 'active',
  flexShrink: 0,
};

export const tabPanel = {
  outline: 'none',
};

export const tabs = {
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'neutral.90',
  mb: 'lg',
  gap: '25px',
};

export const menuTab = {
  ...quiet,
  color: 'neutral.40',
  alignItems: 'center',
  '&.is-selected *, &.is-hovered *': {
    color: 'active',
  },
  '& + *:not(div:first-of-type)': {
    'ml': 'md',
  },
};
