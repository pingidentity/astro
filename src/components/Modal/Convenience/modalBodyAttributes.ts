import { booleanArg } from '../../../utils/docUtils/docArgTypes';

export const modalBodyArgTypes = {
  isScrollable: {
    ...booleanArg,
    description: 'Whether the modal body content area is scrollable.',
  },
  scrollProps: {
    description: 'Props passed to the scrollable container element.',
    control: { type: null },
  },
  containerProps: {
    description: 'Props passed to the outer container Box element.',
    control: { type: null },
  },
  children: {
    description: 'Content to render inside the modal body.',
    control: { type: null },
  },
};
