import { focusWithCroppedOutline } from '../Button/Buttons.styles';

const wrapper = {
  display: 'flex',
  border: '1px dashed',
  borderColor: 'active',
  padding: '10px 0',
  '&.is-drag-active': {
    backgroundColor: 'accent.95',
  },
  '&.is-error': {
    borderColor: 'critical.dark',
  },
  '&.is-success': {
    borderColor: 'success.dark',
  },
  '&.is-warning': {
    borderColor: 'warning.dark',
  },
  '&.is-loading': {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const button = {
  background: 'none',
  cursor: 'pointer',
  '& span': {
    textAlign: 'initial',
  },
  '&:focus-visible': {
    outline: 'none',
  },
  '&.is-hovered, &.is-pressed': {
    cursor: 'pointer',
    '& span': { textDecoration: 'underline' },
  },
  '&.is-focused': {
    ...focusWithCroppedOutline,
  },
};

export default {
  wrapper,
  button,
};
