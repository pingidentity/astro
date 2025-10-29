import tShirtSizes from '../../styles/themes/astro/customProperties/tShirtSizes';

const base = {
  alignItems: 'center',
  border: '1px solid',
  borderColor: 'text.secondary',
  fontSize: 'md',
  p: '15px 12px 15px 0',
  width: '600px',
  '&.is-success, > .is-success': {
    borderColor: 'success.bright',
  },
  '&.is-warning, > .is-warning': {
    borderColor: 'warning.bright',
  },
  '&.is-error, > .is-error': {
    borderColor: 'critical.bright',
  },
};

const icon = {
  mr: 'md',
  ml: 'md',
  minWidth: `${tShirtSizes.md} !important`,
  width: `${tShirtSizes.md} !important`,
  height: `${tShirtSizes.md} !important`,
};

export default {
  base,
  icon,
};
