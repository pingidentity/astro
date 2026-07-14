import { booleanArg, funcArg } from '../../../utils/docUtils/docArgTypes';

export const modalHeaderArgTypes = {
  hasCloseButton: {
    ...booleanArg,
    description: 'Whether the modal header renders a close button.',
  },
  hasNoSeparator: {
    ...booleanArg,
    description: 'When true, the divider line below the header is hidden.',
  },
  onClose: {
    ...funcArg,
    description: 'Callback invoked when the close button is pressed.',
  },
  title: {
    description: 'The title text or node displayed in the modal header.',
    control: { type: 'text' },
  },
  titleProps: {
    description: 'Props passed to the title element.',
    control: { type: null },
  },
  containerProps: {
    description: 'Props passed to the header container Box element.',
    control: { type: null },
  },
  closeButton: {
    description: 'Custom close button node to render in place of the default close button.',
    control: { type: null },
  },
  closeButtonProps: {
    description: 'Props passed to the default close IconButton.',
    control: { type: null },
  },
};
