import tShirtSizes from '../customProperties/tShirtSizes';

const base = {
  width: '100%',
  backgroundColor: 'background.secondary',
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
  minWidth: `${tShirtSizes.sm} !important`,
  width: `${tShirtSizes.sm} !important`,
  height: `${tShirtSizes.sm} !important`,
};

export default {
  base,
  icon,
};
