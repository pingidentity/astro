import React from 'react';
import Clear from 'mdi-react/CloseIcon';
import ContentCopy from 'mdi-react/ContentCopyIcon';
import Earth from 'mdi-react/EarthIcon';
import Chip from '../Chip';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Box from '../Box';
import { flatColorList } from '../../styles/colors.js';

export default {
  title: 'Chip',
  component: Chip,
  argTypes: {
    bg: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
      defaultValue: 'black',
    },
    textColor: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
      defaultValue: 'white',
    },
    label: {
      defaultValue: 'Label',
      control: {
        type: 'text',
      },
    },
    isUppercase: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = ({ ...args }) => (
  <Chip label="Label" color="white" {...args} />
);

export const CountChip = ({ ...args }) => (
  <Box>
    <Chip color="white" {...args} label="1" variant="boxes.countChip" mb="12px" />
    <Chip {...args} label="1" variant="boxes.countNeutral" />
  </Box>
);

export const ChipWithCustomColors = () => (
  <Chip label="Custom Colors" bg="green" textColor="#ffffff" />
);

export const ChipWithIcon = () => (
  <>
    <Chip label="Chip with Icon Button" bg="navy">
      <IconButton aria-label="Clear Chip with Icon Button" variant="inverted">
        <Icon icon={Clear} ml="xs" size="14px" />
      </IconButton>
    </Chip>
    <div style={{ padding: '5px' }} />
    <Chip label="Chip with Icon Button">
      <IconButton aria-label="Clear Chip with Icon Button" variant="inverted">
        <Icon icon={Earth} ml="xs" size="14px" />
      </IconButton>
    </Chip>
    <div style={{ padding: '5px' }} />
    <Chip label="Chip with Icon" bg="green">
      <Icon icon={ContentCopy} ml="xs" size="14px" color="white" aria-hidden="true" focusable="false" />
    </Chip>
  </>
);
