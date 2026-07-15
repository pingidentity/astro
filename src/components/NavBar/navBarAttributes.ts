import { booleanArg, funcArg } from '../../utils/docUtils/docArgTypes';

export const navBarArgTypes = {
  isAutoСollapsible: {
    ...booleanArg,
    description: 'Allows only one item to be expanded at a time (auto-collapse behavior).',
  },
  hasRestoreFocus: {
    ...booleanArg,
    description: 'Whether or not the focus will return to the previously focused element upon unmount.',
  },
  variant: {
    control: { type: 'select' },
    options: ['default', 'popupNav'],
    description: 'Applies a style to the entire nav tree. Options are default and popupNav.',
  },
  defaultSelectedKey: {
    control: { type: 'text' },
    description: 'The initial selected key in the collection (uncontrolled).',
  },
  defaultExpandedKeys: {
    control: false,
    description: 'The initial expanded keys in the collection (uncontrolled).',
  },
  selectedKey: {
    control: false,
    description: 'The selected key in the collection (controlled).',
  },
  setSelectedKey: {
    ...funcArg,
    description: 'Callback function that fires when the selected key changes.',
  },
  children: {
    control: false,
    description: 'Content to render inside the NavBar.',
  },
};
