import React from 'react';
import faker from 'faker';
import Image from '.';

export default {
  title: 'Image',
  component: Image,
};

export const Default = () => (
  <Image src={faker.image.imageUrl(150, 150, 'animals')} />
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
