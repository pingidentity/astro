import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { booleanArg, stringOrStringArray } from '../../utils/docUtils/docArgTypes';
import { onHoverArgTypes } from '../../utils/docUtils/hoverProps';

const descriptions = {
  data: 'Object with User/Group data.',
  className: 'A list of class names to apply to the element',
  isSelected: 'Sets the selected state of the ListItem',
  isPanelHeader: 'A boolean that will adapt the styling of ListIteme to be used as the PanelHeader',
  slots: 'Provides a way to insert markup in specified places.',
  linkProps: 'When present, provides meta click functionality',
  colorId: 'Identifier used to deterministically derive the avatar color when no explicit color is set.',
};

export const SharedItemArgTypes = {
  colorId: {
    description: descriptions.colorId,
    control: {
      type: 'text',
    },
  },
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
