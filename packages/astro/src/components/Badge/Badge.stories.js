import React from 'react';
import Clear from 'mdi-react/CloseIcon';
import ContentCopy from 'mdi-react/ContentCopyIcon';
import Earth from 'mdi-react/EarthIcon';
import Badge from '.';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Box from '../Box';
import { flatColorList } from '../../styles/colors.js';

export default {
  title: 'Badge',
  component: Badge,
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
  <Badge label="Label" color="white" {...args} />
);

export const CountBadge = ({ ...args }) => (
  <Box>
    <Badge color="white" {...args} label="1" variant="countBadge" mb="12px" />
    <Badge {...args} label="1" variant="countNeutral" />
  </Box>
);

export const BadgeWithCustomColors = () => (
  <Badge label="Custom Colors" bg="green" textColor="#ffffff" />
);

export const BadgeWithIcon = () => (
  <>
    <Badge label="Badge with Icon Button" bg="navy">
      <IconButton aria-label="Clear Badge with Icon Button" variant="inverted">
        <Icon icon={Clear} ml="xs" size="14px" />
      </IconButton>
    </Badge>
    <div style={{ padding: '5px' }} />
    <Badge label="Badge with Icon Button">
      <IconButton aria-label="Clear Badge with Icon Button" variant="inverted">
        <Icon icon={Earth} ml="xs" size="14px" />
      </IconButton>
    </Badge>
    <div style={{ padding: '5px' }} />
    <Badge label="Badge with Icon" bg="green">
      <Icon icon={ContentCopy} ml="xs" size="14px" color="white" aria-hidden="true" focusable="false" />
    </Badge>
  </>
);
