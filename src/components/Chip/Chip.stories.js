import React from 'react';
import { Clear } from '@pingux/icons';
import Chip from '../Chip/Chip';
import Icon from '../Icon/Icon';
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
      control: {
        type: 'text',
      },
      defaultValue: 'Label',
    },
  },
};

export const Default = ({ ...args }) => (
  <Chip label="Label" color="white" {...args} />
);

export const ChipWithCustomColors = () => (
  <Chip label="Custom Colors" bg="green" textColor="#ffffff" />
);

export const ChipWithIcon = () => (
  <Chip label="Chip with Icon" bg="navy">
    <Icon icon={Clear} ml="xs" size="10px" color="white" />
  </Chip>
);
