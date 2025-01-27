import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Button, Image } from '../../index';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';
import { chiefIdentityChampions, fallbackImg, pingImg } from '../../utils/devUtils/constants/images';

import ImageReadme from './Image.mdx';

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    docs: {
      page: () => (
        <>
          <ImageReadme />
          <DocsLayout />
        </>
      ),
    },
  },
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
    },
    src: {
      control: {
        type: 'none',
      },
    },
  },
  args: {
    as: 'img',
    src: pingImg,
  },
};

export const Default: StoryFn = ({ ...args }) => <Image {...args} alt="Ping identity square logo" />;

export const Avatar: StoryFn = () => <Image src={pingImg} variant="images.avatar" alt="Ping identity round avatar" />;

export const CustomSizeAndRadius: StoryFn = () => (
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

export const Disabled: StoryFn = () => <Image src={pingImg} isDisabled alt="Ping identity square logo" />;

export const FallbackImage: StoryFn = () => (
  <Image
    fallbackImage={fallbackImg}
    fallbackAlt="Ping Identity"
    src="https://deelay.me/7000/https://picsum.photos/150/150"
    sx={{
      width: '150px',
      height: '150px',
    }}
    alt="Random image"
  />
);


export const WithSkeletonLoadSuccess: StoryFn = () => {
  const imageSrc = isChromatic()
    ? pingImg
    : 'https://app.requestly.io/delay/3000/https://picsum.photos/150/150';

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

export const WithSkeletonLoadTimeout: StoryFn = () => {
  return (
    <Image
      src="https://app.requestly.io/delay/7000/https://picsum.photos/150/150"
      sx={{
        width: '150px',
        height: '150px',
      }}
      alt="Random image"
    />
  );
};

export const UpdatingImageSrc: StoryFn = () => {
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
