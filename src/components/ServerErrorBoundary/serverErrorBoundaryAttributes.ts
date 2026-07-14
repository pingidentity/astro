import { booleanArg } from '../../utils/docUtils/docArgTypes';

export const serverErrorBoundaryArgTypes = {
  hasServerError: {
    ...booleanArg,
    description: 'When true, the error boundary renders the error UI instead of its children.',
  },
  text: {
    control: { type: 'text' },
    description: 'Custom text message to display in the error UI.',
  },
  iconProps: {
    control: { type: null },
    description: 'Props passed to the error icon.',
  },
  buttonProps: {
    control: { type: null },
    description: 'Props passed to the action button displayed in the error UI.',
  },
  renderElement: {
    control: { type: null },
    description: 'Custom element to render in place of the default error UI.',
  },
  children: {
    control: { type: null },
    description: 'Content rendered when there is no server error.',
  },
};
