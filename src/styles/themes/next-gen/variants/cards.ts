import { astroTokens } from '@pingux/onyx-tokens';

import { flat } from '../../../../components/Card/Card.styles';

const interactive = {
  boxShadow: 'none',
  borderRadius: '1rem',
  border: '1px solid',
  borderColor: astroTokens.color.gray[200],
  transition: 'border-color .25s ease-in',
  '&.is-focused': {
    backgroundColor: 'backgroundBase',
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '0px',
  },
  '&.is-hovered': {
    outline: 'none',
    borderColor: 'focus',
    bg: 'default',
  },
};

const container = {
  ...flat,
  p: 'lg',
  borderColor: astroTokens.color.gray[200],
  lineHeight: 'body',
  boxShadow: 'none',
};

const withShadow = {
  ...container,
  boxShadow: 'standard',
  backgroundColor: 'backgroundBase',
};

const dark = {
  ...flat,
  border: 'none',
  backgroundColor: 'card.blue',
  p: 'lg',
  gap: 'lg',
};

const light = {
  ...flat,
  border: 'none',
  backgroundColor: 'card.gray',
  p: 'lg',
  gap: 'lg',
};

const activeCard = {
  ...interactive,
  borderColor: astroTokens.color.gray[200],
  '&.is-hovered': {
    borderColor: 'active',
    bg: 'default',
  },
};

const baseSuggestion = {
  backgroundColor: 'light',
  borderRadius: '4px',
  p: 'md',
  '&.is-hovered': {
    cursor: 'pointer',
    backgroundColor: 'background.suggestion',
  },
  gap: 'md',
  flexGrow: 1,
  transition: 'all .2s ease',
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '0px',
    backgroundColor: 'background.suggestion',
  },
};

const suggestionRow = {
  ...baseSuggestion,
  display: 'flex',
};

const suggestionColumn = {
  ...baseSuggestion,
  display: 'flex',
};

const tableWrapper = {
  ...container,
};

export default {
  interactive,
  dark,
  light,
  activeCard,
  container,
  suggestionColumn,
  suggestionRow,
  tableWrapper,
  withShadow,
  flat: {
    boxShadow: 'none',
  },
};
