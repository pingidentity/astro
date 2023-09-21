import PropTypes from 'prop-types';

import { ariaAttributeBaseArgTypes, ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { booleanArg, stringOrStringArray } from '../../utils/docUtils/docArgTypes';
import { onHoverArgTypes, onHoverPropTypes } from '../../utils/docUtils/hoverProps';

const descriptions = {
  data: 'Object with User/Group data.',
  className: 'A list of class names to apply to the element',
  isSelected: 'Sets the selected state of the ListItem',
  isPanelHeader: 'A boolean that will adapt the styling of ListIteme to be used as the PanelHeader',
  slots: 'Provides a way to insert markup in specified places.',
  linkProps: 'When present, provides meta click functionality',
};

export const SharedItemArgTypes = {
  data: {
    description: descriptions.data,
    type: { summary: '{ icon, image, text, subtext }' },
    control: {
      type: 'none',
    },
  },
  className: {
    description: descriptions.className,
    type: { summary: stringOrStringArray },
  },
};

export const listViewItemArgTypes = {
  isSelected: {
    ...booleanArg,
    description: descriptions.isSelected,
    control: {
      type: 'none',
    },
    linkProps: {
      description: descriptions.linkProps,
      type: { summary: '{ href, target }' },
    },
  },
  onMetaClick: {
    description: '',
  },
  slots: {
    description: descriptions.slots,
    type: { summary: '{ leftOfData, rightOfData }' },
  },
  ...SharedItemArgTypes,
  ...onHoverArgTypes,
  ...ariaAttributeBaseArgTypes,
};

export const SharedItemPropTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  data: PropTypes.shape({
    icon: PropTypes.elementType,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      'aria-label': PropTypes.string,
    }),
    subtext: PropTypes.string,
    text: PropTypes.string,
  }),
};

export const listViewItemPropTypes = {
  isSelected: PropTypes.bool,
  linkProps: PropTypes.object,
  onMetaClick: PropTypes.func,
  slots: PropTypes.shape({
    leftOfData: PropTypes.node,
    rightOfData: PropTypes.node,
  }),
  ...SharedItemPropTypes,
  ...onHoverPropTypes,
  ...ariaAttributesBasePropTypes,
};
