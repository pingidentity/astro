import React from 'react';
import isChromatic from 'chromatic/isChromatic';
import Image from '.';
import { chiefIdentityChampions, pingImg } from './imageConstants';
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
      defaultValue: pingImg,
    },
  },
};

export const Default = ({ ...args }) => <Image {...args} />;

export const Avatar = () => <Image src={pingImg} variant="images.avatar" />;

export const CustomSizeAndRadius = () => (
  <Image
    src={chiefIdentityChampions}
    sx={{
      width: '70px',
      height: '70px',
      borderRadius: 8,
      bg: 'neutral.90',
    }}
  />
);

export const Disabled = () => <Image src={pingImg} isDisabled />;

export const FallbackImage = () => {
  return (
    <Image
      fallbackImage={pingImg}
      src="https://deelay.me/7000/https://picsum.photos/150/150"
      sx={{
        width: '150px',
        height: '150px',
      }}
    />
  );
};

export const WithSkeletonLoadSuccess = ({ useLocalSrc }) => {
  const imageSrc = useLocalSrc
    ? pingImg
    : 'https://deelay.me/3000/https://picsum.photos/150/150';

  return (
    <Image
      src={imageSrc}
      sx={{
        width: '150px',
        height: '150px',
      }}
    />
  );
};

WithSkeletonLoadSuccess.args = {
  useLocalSrc: isChromatic(),
};

export const WithSkeletonLoadTimeout = () => {
  return (
    <Image
      src="https://deelay.me/7000/https://picsum.photos/150/150"
      sx={{
        width: '150px',
        height: '150px',
      }}
    />
  );
};
