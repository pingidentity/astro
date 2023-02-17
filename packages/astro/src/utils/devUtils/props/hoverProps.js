import PropTypes from 'prop-types';

const descriptions = {
  onHoverStart: 'Handler that is called when a hover interaction starts.',
  onHoverEnd: 'Handler that is called when a hover interaction ends.',
  onHoverChange: 'Handler that is called when the hover state changes.',
};

export const baseDocSettings = {
  type: { summary: 'func' },
  control: { type: null },
  table: {
    category: 'Hover Handlers',
  },
};

export const onHoverArgTypes = {
  'onHoverStart': {
    description: descriptions.onHoverStart,
    ...baseDocSettings,
  },
  'onHoverEnd': {
    description: descriptions.onHoverEnd,
    ...baseDocSettings,
  },
  'onHoverChange': {
    description: descriptions.onHoverChange,
    ...baseDocSettings,
  },
};

export const onHoverPropTypes = {
  onHoverStart: PropTypes.func,
  onHoverEnd: PropTypes.func,
  onHoverChange: PropTypes.func,
};
