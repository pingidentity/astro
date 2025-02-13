import { flat } from '../../../../components/Card/Card.styles';

const interactive = {
  boxShadow: 'none',
  borderRadius: '1rem',
  border: '1px solid',
  borderColor: 'border.base',
  transition: 'border-color .25s ease-in',
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '0px',
  },
  '&.is-hovered': {
    outline: 'none',
    borderColor: 'blue',
    bg: 'default',
  },
};

const container = {
  ...flat,
  p: 'lg',
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
  borderColor: 'border.base',
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

export default {
  interactive,
  dark,
  light,
  activeCard,
  container,
  suggestionColumn,
  suggestionRow,
};
