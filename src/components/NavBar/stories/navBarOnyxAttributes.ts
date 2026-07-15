import { booleanArg, funcArg } from '../../../utils/docUtils/docArgTypes';

export const navBarOnyxArgTypes = {
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
  setSelectedKey: {
    ...funcArg,
    description: 'Callback function that fires when the selected key changes.',
  },
  children: {
    control: { type: null },
    description: 'Content to render inside the NavBar.',
  },
};
