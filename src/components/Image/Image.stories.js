import React from 'react';
import faker from 'faker';
import Image from '.';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';

export default {
  title: 'Image',
  component: Image,
  argTypes: {
    isDisabled: {},
    variant: {
      control: {
        type: 'none',
      },
    },
    as: {
      control: {
        type: 'none',
        options: htmlElements,
      },
      defaultValue: 'img',
    },
    src: {
      control: {
        type: 'none',
      },
      defaultValue: faker.image.imageUrl(150, 150, 'animals'),
    },
  },
};

export const Default = ({ ...args }) => (
  <Image {...args} />
);

export const Avatar = () => (
  <Image
    src={faker.image.imageUrl(30, 30, 'animals')}
    variant="images.avatar"
  />
);

export const CustomSizeAndRadius = () => (
  <Image
    src={faker.image.imageUrl(75, 75, 'animals')}
    sx={{
        width: '70px',
        height: '70px',
        borderRadius: 8,
      }}
  />
);

export const Disabled = () => (
  <Image
    src={faker.image.imageUrl(50, 50, 'animals')}
    isDisabled
  />
);
