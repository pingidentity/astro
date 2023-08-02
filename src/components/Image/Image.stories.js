import React, { useState } from 'react';
import isChromatic from 'chromatic/isChromatic';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Button, Image } from '../../index';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';
import { chiefIdentityChampions, pingImg } from '../../utils/devUtils/constants/images';

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

export const FallbackImage = () => (
  <Image
    fallbackImage={pingImg}
    fallbackAlt="Ping Identity"
    src="https://deelay.me/7000/https://picsum.photos/150/150"
    sx={{
      width: '150px',
      height: '150px',
    }}
    alt="Random image"
  />
);


export const WithSkeletonLoadSuccess = ({ useLocalSrc }) => {
  const imageSrc = useLocalSrc
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

WithSkeletonLoadSuccess.args = {
  useLocalSrc: isChromatic(),
};

export const WithSkeletonLoadTimeout = () => {
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
