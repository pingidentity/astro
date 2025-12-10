import PropTypes from 'prop-types';

const descriptions = {
  isHovered: 'If the item is hovered',
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
  isHovered: {
    description: descriptions.isHovered,
    ...baseDocSettings,
  },
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
  isHovered: PropTypes.bool,
  onHoverChange: PropTypes.func,
  onHoverEnd: PropTypes.func,
  onHoverStart: PropTypes.func,
};
