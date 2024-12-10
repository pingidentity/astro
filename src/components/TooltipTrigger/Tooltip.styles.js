import { baseBadge } from '../Badge/Badge.styles';
import { text } from '../Button/Buttons.styles';

export const container = {
  maxWidth: '300px',
  overflow: 'visible',
  wordBreak: 'break-word',
  display: 'flex',
  '.is-right > * > &, .is-left > * > &': {
    maxWidth: '24em',
    maxHeight: '6.5em',
    WebkitLineClamp: '4',
  },
};

export const badgeTooltipContainer = {
  ...container,
  fontSize: 'sm',
  fontWeight: '1',
  lineHeight: '15.87px',
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
  badgeTooltipContainer,
  badge,
  button,
  inline,
};
