import { base, wordWrap } from '../Text/Text.styles';

const title = {
  ...base,
  ...wordWrap,
  fontSize: 'sm',
  '&.is-default': {
    color: 'text.secondary',
  },
  '&.is-error': {
    color: 'critical.dark',
  },
  '&.is-success': {
    color: 'success.dark',
  },
  '&.is-warning': {
    color: 'warning.dark',
  },
  '.is-left-label > &': {
    gridRowEnd: 3,
    gridColumnEnd: 3,
  },
};

export default {
  title,
};
