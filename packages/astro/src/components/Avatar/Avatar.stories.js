import React from 'react';
import faker from 'faker';
import Avatar from '.';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: {
        type: 'none',
      },
      defaultValue: faker.image.lorempicsum.imageUrl(150, 150, false, 0, '1'),
    },
  },
};

export const Default = ({ ...args }) => (
  <Avatar {...args} />
);
