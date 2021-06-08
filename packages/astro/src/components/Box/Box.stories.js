import React from 'react';
import Box from '.';
import { SelectField, Item, TextField } from '../../index';
import { flatColorList } from '../../styles/colors.js';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';

export default {
  title: 'Box',
  component: Box,
  argTypes: {
    bg: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
      defaultValue: 'active',
    },
    gap: {
      control: {
        type: 'text',
      },
      description: 'Gap between items, whether in a row or column. Numeric value paired with a unit. https://www.w3schools.com/cssref/css_units.asp',
      defaultValue: '10px',
    },
    as: {
      control: {
        type: 'select',
        options: htmlElements,
      },
      defaultValue: 'div',
    },
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
  <Box bg="white" isDisabled sx={{ border: '1px solid', borderColor: 'neutral.80' }} width="100%" p="xl" {...args}>
    <TextField
      id="custom-id"
      name="custom-name"
      label="Example Label"
    />
    <br />
    <SelectField label="What's your favorite color?" labelMode="float">
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </SelectField>
  </Box>
);

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
