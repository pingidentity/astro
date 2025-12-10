import PropTypes from 'prop-types';

import { ariaAttributeBaseArgTypes, ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { booleanArg, funcArg, stringOrStringArray } from '../../utils/docUtils/docArgTypes';
import { onHoverArgTypes, onHoverPropTypes } from '../../utils/docUtils/hoverProps';

const descriptions = {
  selectionMode: 'The type of selection that is allowed.',
  disabledKeys: 'The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.',
  defaultSelectedKeys: `
  The initial selected keys in the collection (uncontrolled).
  \`defaultSelectedKeys="all"\` can be used to select every key.
  `,
  selectedKeys: `
  The currently selected keys in the collection (controlled).
  \`selectedKeys="all"\` can be used to select every key.
  `,
  isDisabled: 'Whether the item is disabled. ',
  isSelected: 'Whether the menu item is selected.',
  isNotFocusedOnHover: 'Whether menu item should receive focus state on hover.',
  onAction: 'Handler that is called when an item is selected. `(key: Key) => void`',
  onSelectionChange: `Handler that is called when the selection changes. Does not fire when \`selectionMode="none"\`.
  \`(keys: Selection) => any\`
  `,
};

export const menuArgTypes = {
  onAction: {
    description: descriptions.onAction,
    ...funcArg,
  },
  onSelectionChange: {
    description: descriptions.onSelectionChange,
    ...funcArg,
  },
  selectionMode: {
    description: descriptions.selectionMode,
    control: {
      type: 'radio',
      options: ['none', 'single', 'multiple'],
      defaultValue: 'none',
    },
    type: { summary: 'none, single, multiple' },
  },
  isDisabled: {
    description: descriptions.isDisabled,
    ...booleanArg,
  },
  isNotFocusedOnHover: {
    description: descriptions.isNotFocusedOnHover,
    ...booleanArg,
  },
  isSelected: {
    ...booleanArg,
    control: {
      type: 'none',
    },
    description: descriptions.isSelected,
  },
  disabledKeys: {
    control: {
      type: 'none',
    },
    description: descriptions.disabledKeys,
    type: { summary: stringOrStringArray },
  },
  defaultSelectedKeys: {
    control: {
      type: 'none',
    },
    description: descriptions.defaultSelectedKeys,
    type: { summary: stringOrStringArray },
  },
  selectedKeys: {
    control: {
      type: 'none',
    },
    type: { summary: stringOrStringArray },
    description: descriptions.selectedKeys,
  },
  ...ariaAttributeBaseArgTypes,
  ...onHoverArgTypes,
};

export const menuPropTypes = {
  selectionMode: PropTypes.oneOf(['none', 'single', 'multiple']),
  disabledKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  defaultSelectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  selectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  isNotFocusedOnHover: PropTypes.bool,
  onAction: PropTypes.func,
  onSelectionChange: PropTypes.func,
  ...ariaAttributesBasePropTypes,
  ...onHoverPropTypes,
};
