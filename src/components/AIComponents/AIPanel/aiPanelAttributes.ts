import { booleanArg, funcArg } from '../../../utils/docUtils/docArgTypes';

export const aiPanelArgTypes = {
  state: {
    description: 'The overlay panel state object controlling open/close behavior (required).',
    control: { type: null },
  },
  isExpanded: {
    ...booleanArg,
    description: 'Whether the AI panel is in expanded (full-width) mode.',
  },
  setIsExpanded: {
    ...funcArg,
    description: 'Callback invoked to toggle the expanded state of the panel.',
  },
  onPanelClose: {
    ...funcArg,
    description: 'Callback invoked when the panel close action is triggered.',
  },
  headerProps: {
    description: 'Props passed to the panel header element.',
    control: { type: null },
  },
};
