export const textArgTypes = {
  as: {
    control: false,
  },
  role: {
    control: false,
  },
  variant: {
    control: false,
    description: 'Text variant.',
  },
  children: {
    control: false,
    description: 'Text value.',
  },
  color: {
    control: {
      type: 'text',
    },
    description: 'Text color.',
  },
  bg: {
    control: false,
    description: 'Background color.',
  },
};
