import React from 'react';
import Clear from 'mdi-react/CloseIcon';
import ContentCopy from 'mdi-react/ContentCopyIcon';
import Earth from 'mdi-react/EarthIcon';
import Chip from '.';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Box from '../Box';
import { flatColorList } from '../../styles/colors.js';
import DocsLayout from '../../../.storybook/storybookDocsLayout';
import ChipReadme from './Chip.mdx';

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    docs: {
      page: () => (
        <>
          <ChipReadme />
          <DocsLayout />
        </>
      ),
    },
  },
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

const VariableIcon = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
      <g clipPath="url(#clip0_709_18965)">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="#7AC7F2" />
        <path d="M11.5042 4.25C12.0833 5.37917 12.3125 6.68333 12.1667 8C12.0833 9.31667 11.625 10.6208 10.8458 11.75L10.2083 11.3333C10.8792 10.3208 11.2708 9.16667 11.3333 8C11.475 6.83333 11.2875 5.67917 10.7917 4.66667L11.5042 4.25ZM5.15416 4.25L5.79166 4.66667C5.12083 5.67917 4.72916 6.83333 4.66666 8C4.525 9.16667 4.71666 10.3208 5.20833 11.3333L4.50416 11.75C3.92083 10.6208 3.6875 9.32083 3.83333 8C3.91666 6.68333 4.375 5.37917 5.15416 4.25ZM8.03333 7.45L9 6.10417H10.0542L8.47916 8.1875L9.39583 10.2375H8.45416L7.87916 8.83333L6.86666 10.2208H5.81666L7.44166 8.0875L6.55416 6.10417H7.5L8.03333 7.45Z" fill="#7AC7F2" />
      </g>
      <defs>
        <clipPath id="clip0_709_18965">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Default = ({ ...args }) => (
  <Chip label="Label" color="white" {...args} />
);

export const CountChip = ({ ...args }) => (
  <Box>
    <Chip color="white" {...args} label="1" variant="variants.boxes.countChip" mb="12px" />
    <Chip {...args} label="1" variant="variants.boxes.countNeutral" />
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


export const ChipWithLeftSlotAndIcon = () => (
  <Chip label="Chip with Icon Button and Left Slot" bg="white" variant="variants.boxes.itemChipWithSlot" slots={{ leftIcon: <Icon icon={VariableIcon} size={16} /> }} >
    <IconButton
      aria-label="delete"
      variant="buttons.chipWithSlotDeleteButton"
    >
      <Icon icon={Clear} size={14} />
    </IconButton>
  </Chip>
);
