import React, { useState } from 'react';
import isChromatic from 'chromatic/isChromatic';
import Image from '.';
import { chiefIdentityChampions, pingImg } from './imageConstants';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';
import { Box, Button } from '../../index';

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

export const Default = ({ ...args }) => <Image {...args} alt="Ping identity square logo" />;

export const Avatar = () => <Image src={pingImg} variant="images.avatar" alt="Ping identity round avatar" />;

export const CustomSizeAndRadius = () => (
  <Image
    src={chiefIdentityChampions}
    sx={{
      width: '70px',
      height: '70px',
      borderRadius: 8,
      bg: 'neutral.90',
    }}
    alt="Terry Crews in a red suite"
  />
);

export const Disabled = () => <Image src={pingImg} isDisabled alt="Ping identity square logo" />;

export const FallbackImage = () => {
  return (
    <Image
      fallbackImage={pingImg}
      src="https://deelay.me/7000/https://picsum.photos/150/150"
      sx={{
        width: '150px',
        height: '150px',
      }}
      alt="Random image"
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
      alt="Random image"
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
      alt="Random image"
    />
  );
};

export const UpdatingImageSrc = () => {
  const [image, setImage] = useState(chiefIdentityChampions);
  const handleButtonPress = () => {
    const src = image === pingImg ? chiefIdentityChampions : pingImg;
    setImage(src);
  };

  return (
    <Box sx={{ width: '200px' }}>
      <Button onPress={handleButtonPress}>
        Change Image
      </Button>
      <Image
        src={image}
        sx={{
        width: '200px',
        height: '200px',
        mt: '25px',
        }}
        alt={image === pingImg ? 'Ping identity square logo' : 'Terry Crews in a red suite'}
      />
    </Box>
  );
};
