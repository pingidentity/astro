import { baseBadge } from '../Badge/Badge.styles';
import { text } from '../Button/Buttons.styles';

export const container = {
  maxWidth: '11.3em',
  maxHeight: '15em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '10',
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box !important',
  wordBreak: 'break-word',

  '.is-right > * > &, .is-left > * > &': {
    maxWidth: '24em',
    maxHeight: '6.5em',
    WebkitLineClamp: '4',
  },
};

const badge = {
  ...baseBadge,
  cursor: 'default',
  '&.is-hovered, &.is-pressed': {
    cursor: 'default',
    outline: 'none',
  },
};

export const button = {
  cursor: 'default',
  '&.is-hovered, &.is-pressed': {
    backgroundColor: 'inherit',
    cursor: 'default',
    path: {
      fill: 'neutral.20',
    },
  },
};

const inline = {
  ...text,
  cursor: 'default',
  alignSelf: 'flex-start',
  '&.is-hovered, &.is-pressed': {
    backgroundColor: 'inherit',
    cursor: 'default',
    textDecoration: 'inherit',
  },
};

export default {
  container,
  badge,
  button,
  inline,
};
