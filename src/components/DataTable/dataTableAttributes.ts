import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

export const dataTableArgTypes = {
  density: {
    control: {
      disable: true,
    },
  },
  overflowMode: {
    control: {
      disable: true,
    },
  },
  selectedKeys: {
    description: 'The array of keys that is currently selected. (Controlled version).',
    control: {
      disable: true,
    },
  },
  disabledKeys: {
    description: 'The array of keys that are unabled to be selected.',
    control: {
      disable: true,
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
  selectionMode: {
    description: 'Options are "none" and "single". Whether or not the DataTable support selection',
    control: {
      disable: true,
    },
  },
  width: {
    description: 'Sets the width of the data table.',
    control: {
      disable: true,
    },
  },
  height: {
    description: 'Sets the height of the data table.',
    control: {
      disable: true,
    },
  },
  sortDescriptor: {
    description: 'Defines the current column key to sort by and the sort direction.',
    control: {
      disable: true,
    },
  },
  onSortChange: {
    description: 'Callback function that fires when sortable column header is pressed.',
  },
  allowsSorting: {
    description: 'Determine if the column supports sorting.',
    control: {
      disable: true,
    },
  },
  hideHeader: {
    description: 'Determine if the header should be hidden.',
    control: {
      disable: true,
    },
  },
  loadingState: {
    description: 'Reflects current loading state.',
    control: {
      disable: true,
    },
  },
  onLoadMore: {
    description: 'Callback function that fires when more data should be loaded on demand as user scrolls.',
  },
  items: {
    control: {
      disable: true,
    },
    description: 'The list of DataTable items.',
  },
  ...ariaAttributeBaseArgTypes,
};
