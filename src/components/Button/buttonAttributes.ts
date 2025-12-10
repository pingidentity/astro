import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { booleanArg } from '../../utils/docUtils/docArgTypes';
import { onHoverArgTypes } from '../../utils/docUtils/hoverProps';
import { onPressArgTypes } from '../../utils/docUtils/pressAttributes';
// add designer approved variants for devs to use here
const variantOptions = [
  'critical',
  'default',
  'inline',
  'inlinePrimary',
  'link',
  'primary',
];

const descriptions = {
  children: 'Button text.',
  isDisabled: 'Whether the button is disabled.',
  isLoading: 'Shows loader instead of children',
  tabIndex: 'The focus variation of button',
  variant: 'The styling variation of the button.',
};

export const buttonArgTypes = {
  variant: {
    options: variantOptions,
    control: {
      type: 'select',
    },
    description: descriptions.variant,
  },
  children: {
    table: {
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
    description: descriptions.children,
  },
  isLoading: {
    ...booleanArg,
    description: descriptions.isLoading,
  },
  isDisabled: {
    ...booleanArg,
    description: descriptions.isDisabled,
  },
  tabIndex: {
    description: descriptions.tabIndex,
  },
  ...onPressArgTypes,
  ...onHoverArgTypes,
  ...ariaAttributeBaseArgTypes,
};
