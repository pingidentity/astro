export const avatarArgTypes = {
  src: {
    control: false,
  },
  size: {
    control: {
      type: 'text',
    },
    description: 'Size of the avatar. Can be a string. like 50px',
  },
  alt: {
    control: {
      type: 'text',
    },
    description: 'Alternative text for the image.',
  },
  defaultText: {
    control: {
      type: 'text',
    },
    description: 'Default text to be displayed when src is not available.',
  },
};
