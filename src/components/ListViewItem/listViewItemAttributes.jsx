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
  colorId: 'When the value exactly matches a two-tone color name (for example cyan or lightBlue), the avatar renders with that color. Any other value falls back to deterministic color interpolation seeded by the value.',
  isIconRound: 'Renders the icon avatar round instead of square. Defaults to false.',
  avatarInitials: 'Initials rendered inside the avatar in place of the icon.',
  avatarProps: 'Props forwarded to the underlying avatar element. children is managed by the component.',
  avatarDefaultText: 'Text used to seed avatar color interpolation when colorId is not provided.',
};

export const SharedItemArgTypes = {
  colorId: {
    description: descriptions.colorId,
    control: {
      type: 'text',
    },
  },
  isIconRound: {
    ...booleanArg,
    description: descriptions.isIconRound,
  },
  avatarInitials: {
    description: descriptions.avatarInitials,
    control: {
      type: 'text',
    },
  },
  avatarProps: {
    description: descriptions.avatarProps,
    control: {
      type: 'object',
    },
  },
  data: {
    description: descriptions.data,
    type: { summary: '{ icon, image, text, subtext, avatarDefaultText }' },
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
  colorId: PropTypes.string,
  avatarProps: PropTypes.object,
  isIconRound: PropTypes.bool,
  avatarInitials: PropTypes.string,
  data: PropTypes.shape({
    icon: PropTypes.elementType,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      'aria-label': PropTypes.string,
    }),
    subtext: PropTypes.string,
    text: PropTypes.string,
    avatarDefaultText: PropTypes.string,
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
