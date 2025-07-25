export const gridListArgTypes = {
  isReorderable: {
    description: 'Whether or not the list has drag and drop reorder enabled.',
    control: {
      type: 'boolean',
    },
  },
  selectedKeys: {
    description: 'The array of keys that is currently selected. (Controlled version).',
    control: {
      disable: true,
    },
  },
  disabledKeys: {
    description: 'The array of keys that are unable to be selected.',
    control: {
      type: 'text',
    },
  },
  defaultSelectedKeys: {
    description: 'The array of keys that is selected by default. (Uncontrolled version).',
    control: {
      disable: true,
    },
  },
  onSelectionChange: {
    description: 'A callback function that fires when the selection changes.',
    control: {
      disable: true,
    },
  },
  allowDuplicateSelectionEvents: {
    description: 'Whether duplicate selection events are allowed.',
    control: {
      type: 'boolean',
    },
  },
  autoFocus: {
    description: 'Whether the grid should automatically focus on mount.',
    control: {
      type: 'boolean',
    },
  },
  children: {
    description: 'The child nodes to render inside the grid.',
    control: {
      disable: true,
    },
  },
  collection: {
    description: 'The collection of items to display in the grid.',
    control: {
      disable: true,
    },
  },
  disabledBehavior: {
    description: 'Defines how disabled items are handled.',
    control: {
      type: 'select',
      options: ['all', 'selection'],
    },
  },
  disallowEmptySelection: {
    description: 'Whether empty selection is disallowed.',
    control: {
      type: 'boolean',
    },
  },
  disallowTypeAhead: {
    description: 'Whether type-ahead functionality is disabled.',
    control: {
      type: 'boolean',
    },
  },
  escapeKeyBehavior: {
    description: 'Defines the behavior when the Escape key is pressed.',
    control: {
      type: 'select',
      options: ['clearSelection', 'none'],
    },
  },
  filter: {
    description: 'A function to filter items based on the input text.',
    control: {
      disable: true,
    },
  },
  getKey: {
    description: 'A function to get the key for an item.',
    control: {
      disable: true,
    },
  },
  initialFilterText: {
    description: 'The initial filter text for the grid.',
    control: {
      type: 'text',
    },
  },
  initialSelectedKeys: {
    description: 'The keys that are initially selected.',
    control: {
      disable: true,
    },
  },
  items: {
    description: 'The list of items to display in the grid.',
    control: {
      disable: true,
    },
  },
  keyboardDelegate: {
    description: 'A custom keyboard delegate for handling keyboard navigation.',
    control: {
      disable: true,
    },
  },
  keyboardNavigationBehavior: {
    description: 'Defines the keyboard navigation behavior for the grid.',
    control: {
      type: 'select',
      options: ['arrow', 'tab'],
    },
  },
  linkBehavior: {
    description: 'Defines the behavior of links in the grid.',
    control: {
      type: 'select',
      options: ['action', 'selection', 'override'],
    },
  },
  onAction: {
    description: 'A callback function that fires when an action is performed on an item.',
    control: {
      disable: true,
    },
  },
  ref: {
    description: 'A ref object for the grid.',
    control: {
      disable: true,
    },
  },
  selectionBehavior: {
    description: 'Defines the selection behavior for the grid.',
    control: {
      type: 'select',
      options: ['toggle', 'replace'],
    },
  },
  selectionMode: {
    description: 'Defines the selection mode for the grid.',
    control: {
      type: 'select',
      options: ['none', 'single', 'multiple'],
    },
  },
  shouldFocusWrap: {
    description: 'Whether focus should wrap around when navigating with the keyboard.',
    control: {
      type: 'boolean',
    },
  },
  shouldSelectOnPressUp: {
    description: 'Whether selection should occur on key press up.',
    control: {
      type: 'boolean',
    },
  },
};
