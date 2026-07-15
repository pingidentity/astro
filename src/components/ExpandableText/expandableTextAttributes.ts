export const expandableTextArgTypes = {
  maxLines: {
    control: { type: 'number' },
    description: 'The maximum number of lines to display before the text is truncated.',
  },
  className: {
    control: { type: 'text' },
    description: 'Additional CSS class name to apply to the component.',
  },
  children: {
    control: { type: null },
    description: 'The text content to display, which may be truncated based on maxLines.',
  },
  buttonProps: {
    control: { type: null },
    description: 'Props to pass to the expand/collapse toggle button.',
  },
};
