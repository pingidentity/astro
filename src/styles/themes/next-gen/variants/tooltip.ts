import { astroTokens } from '@pingux/onyx-tokens';

import { defaultFocus } from './button';

const container = {
  backgroundColor: astroTokens.color.tooltip.container.bg,
  borderRadius: '3px',
  fontSize: 'sm',
  fontFamily: 'standard',
  lineHeight: 'body',
  p: '0',
  px: 'sm',
  py: 'xs',
};


const badge = {
  borderRadius: '4px',
  position: 'relative',
  '&.is-focused:before': {
    position: 'absolute',
    content: '""',
    width: '100%',
    height: '100%',
    padding: '2px',
    borderRadius: '2px',
    border: '1px solid',
    borderColor: 'focus',
  },
};

const inline = {
  color: astroTokens.color.font.base,
  '&.is-focused': {
    ...defaultFocus,
  },
};

export default {
  container,
  badge,
  inline,
};
