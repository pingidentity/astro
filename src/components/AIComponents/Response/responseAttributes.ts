export const responseArgTypes = {
  delay: {
    description: 'Delay in milliseconds before the animation starts.',
    control: { type: 'number' },
  },
  children: {
    description: 'Content rendered inside the response container (required).',
    control: false,
  },
  containerProps: {
    description: 'Props passed to the outer container element.',
    control: false,
  },
  iconProps: {
    description: 'Props passed to the AI icon element.',
    control: false,
  },
};
