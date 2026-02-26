import { astroTokens } from '@pingux/onyx-tokens';

const header = {
  px: 'lg',
  py: 'md',
  minHeight: '75px',
  border: 'none',
  '&.is-hovered': {
    backgroundColor: astroTokens.color.gray[100],
  },
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '0',
  },
};

const body = {
  p: 'lg',
  pt: 0,
};

const item = {

};

export default {
  header,
  body,
  item,
};
