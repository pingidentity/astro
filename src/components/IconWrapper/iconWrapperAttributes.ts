const colorOptions = [
  'cyan',
  'orange',
  'red',
  'green',
  'purple',
  'yellow',
  'teal',
  'pink',
];

const sizes = [
  'sm',
  'md',
  'lg',
];

export const iconWrapperArgTypes = {
  color: {
    options: colorOptions,
    control: {
      type: 'select',
    },
    description: 'The color applied to the IconWrapper will style both the background and the icon.',
  },
  icon: {
    control: {
      type: 'none',
    },
    description: 'The icon to render. List of icons at https://materialdesignicons.com/',
  },
  size: {
    options: sizes,
    control: {
      type: 'select',
    },
  },
};
