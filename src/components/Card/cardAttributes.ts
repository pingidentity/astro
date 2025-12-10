import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { onHoverArgTypes } from '../../utils/docUtils/hoverProps';
import { onPressArgTypes } from '../../utils/docUtils/pressAttributes';

export const cardArgTypes = {
  children: {
    description: 'Card content.',
    table: {
      type: {
      },
    },
    control: {
      type: 'text',
    },
  },
  ...onPressArgTypes,
  ...onHoverArgTypes,
  ...ariaAttributeBaseArgTypes,
};
