import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Image,
  Text,
} from '../../index';
import { flatColorList } from '../../styles/colors';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';
import { pingImg } from '../../utils/devUtils/constants/images';

import BoxReadme from './Box.mdx';

export default {
  title: 'Components/Box',
  component: Box,
  parameters: {
    docs: {
      page: () => (
        <>
          <BoxReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    bg: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
    },
    gap: {
      control: {
        type: 'text',
      },
      description: 'Gap between items, whether in a row or column. Numeric value paired with a unit. https://www.w3schools.com/cssref/css_units.asp',
    },
    as: {
      control: {
        type: 'select',
        options: htmlElements,
      },
    },
  },
  args: {
    bg: 'active',
    gap: '10px',
    as: 'div',
  },
};

export const Default = ({ ...args }) => (
  <Box bg="active" width="100%" p="xl" {...args}>
    <Box width={30} height={15} m="sm" bg="success.bright" />
    <Box width={100} height={50} m="sm" bg="critical.bright" />
    <Box width={190} height={45} m="sm" bg="warning.bright" />
  </Box>
);

export const Disabled = ({ ...args }) => (
  <Box
    bg="white"
    isDisabled
    width="100%"
    p="xl"
    {...args}
  >
    <Image
      alt="Ping identity square logo"
      src={pingImg}
      sx={{
        width: '40px',
        height: '40px',
      }}
    />
    <Text fontSize="xl">
      Exceptional Experiences Start with Secure Identity
    </Text>
  </Box>
);

Disabled.parameters = {
  docs: {
    description: {
      story: 'The disabled state only impacts styling and mouse clicks. Anything with keyboard events will still work.',
    },
  },
};

Disabled.args = {
  isDisabled: {
    defaultValue: true,
  },
  bg: {
    control: {
      type: 'select',
      options: flatColorList.map(([colorName]) => colorName),
    },
    defaultValue: 'white',
  },
  sx: {
    border: '1px solid',
    borderColor: 'neutral.80',
    display: 'flex',
    flexDirection: 'row !important',
    gap: '10px',
  },
};

export const BoxesWithGaps = () => (
  <Box gap="xs">
    <Box bg="accent.5" isRow gap="xl" justifyContent="center">
      <Box width={10} height={50} bg="decorativeLight.1" />
      <Box width={10} height={50} bg="decorativeLight.2" />
      <Box width={10} height={50} bg="decorativeLight.3" />
      <Box width={10} height={50} bg="decorativeLight.4" />
      <Box width={10} height={50} bg="decorativeLight.5" />
      <Box width={10} height={50} bg="decorativeLight.6" />
      <Box width={10} height={50} bg="decorativeLight.7" />
      <Box width={10} height={50} bg="decorativeLight.8" />
      <Box width={10} height={50} bg="decorativeLight.9" />
      <Box width={10} height={50} bg="decorativeLight.10" />
    </Box>
    <Box bg="accent.50" isRow gap="lg" justifyContent="center">
      <Box width={10} height={50} bg="decorative.1" />
      <Box width={10} height={50} bg="decorative.2" />
      <Box width={10} height={50} bg="decorative.3" />
      <Box width={10} height={50} bg="decorative.4" />
      <Box width={10} height={50} bg="decorative.5" />
      <Box width={10} height={50} bg="decorative.6" />
      <Box width={10} height={50} bg="decorative.7" />
      <Box width={10} height={50} bg="decorative.8" />
      <Box width={10} height={50} bg="decorative.9" />
      <Box width={10} height={50} bg="decorative.10" />
    </Box>

    <Box bg="accent.90" isRow gap="md" justifyContent="center">
      <Box width={10} height={50} bg="decorativeDark.1" />
      <Box width={10} height={50} bg="decorativeDark.2" />
      <Box width={10} height={50} bg="decorativeDark.3" />
      <Box width={10} height={50} bg="decorativeDark.4" />
      <Box width={10} height={50} bg="decorativeDark.5" />
      <Box width={10} height={50} bg="decorativeDark.6" />
      <Box width={10} height={50} bg="decorativeDark.7" />
      <Box width={10} height={50} bg="decorativeDark.8" />
      <Box width={10} height={50} bg="decorativeDark.9" />
      <Box width={10} height={50} bg="decorativeDark.10" />
    </Box>
  </Box>
);
