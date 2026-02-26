import { astroTokens } from '@pingux/onyx-tokens';


const base = {
  width: '100%',
  backgroundColor: 'light',
  lineHeight: 'md',
  p: 'md',
  border: 'none',
  borderLeft: '5px solid',
  borderLeftColor: 'active',
  borderRadius: '.25rem',
  alignItems: 'flex-start',
  color: 'text.primary',
  '&.is-success, > .is-success': {
    borderColor: 'unset',
    borderLeftColor: 'success.bright',
  },
  '&.is-warning, > .is-warning': {
    borderColor: 'unset',
    borderLeftColor: 'warning.bright',
  },
  '&.is-error, > .is-error': {
    borderColor: 'unset',
    borderLeftColor: 'critical.bright',
  },
};

const icon = {
  ml: '0',
  mr: 'md',
  minWidth: `${astroTokens.size.alert.icon}px !important`,
  width: `${astroTokens.size.alert.icon}px !important`,
  height: `${astroTokens.size.alert.icon}px !important`,
};

export default {
  base,
  icon,
};
