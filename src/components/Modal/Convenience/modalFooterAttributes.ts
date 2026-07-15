import { funcArg } from '../../../utils/docUtils/docArgTypes';

export const modalFooterArgTypes = {
  onSubmit: {
    ...funcArg,
    description: 'Callback invoked when the primary (submit) button is pressed.',
  },
  onCancel: {
    ...funcArg,
    description: 'Callback invoked when the secondary (cancel) button is pressed.',
  },
  primaryButtonText: {
    description: 'Label text for the primary submit button.',
    control: { type: 'text' },
  },
  secondaryButtonText: {
    description: 'Label text for the secondary cancel button.',
    control: { type: 'text' },
  },
  children: {
    description: 'Additional content to render inside the footer.',
    control: { type: null },
  },
  footerProps: {
    description: 'Props passed to the footer container Box element.',
    control: { type: null },
  },
};
