import React from 'react';
import Clear from '@pingux/mdi-react/CloseIcon';
import ContentCopy from '@pingux/mdi-react/ContentCopyIcon';
import Earth from '@pingux/mdi-react/EarthIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  Icon,
  IconButton,
} from '../../index';
import { flatColorList } from '../../styles/colors';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.ts';

import BadgeReadme from './Badge.mdx';

export default {
  title: 'Components/Badge',
  component: Badge,
  decorators: [withDesign],
  argTypes: {
    bg: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
    },
    textColor: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    isUppercase: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    label: 'Label',
    isUppercase: false,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <BadgeReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

const VariableIcon = props => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="variable-icon-title" {...props}>
      <title id="variable-icon-title">Variable Icon</title>
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
  <Badge label="Label" {...args} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.default,
  },
};

export const CountBadge = () => (
  <Box isRow gap="xs">
    <Badge label="4" variant="countBadge" />
    <Badge label="4" variant="countNeutral" />
  </Box>
);

CountBadge.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.countBadge,
  },
};

export const BadgeWithCustomColors = () => (
  <Badge label="Custom Colors" bg="green" textColor="#ffffff" />
);

export const BadgeWithIcon = () => (
  <>
    <Badge label="Badge with Icon Button" bg="navy">
      <IconButton aria-label="Clear Badge with Icon Button" variant="inverted">
        <Icon icon={Clear} ml="xs" size="14px" title={{ name: 'Clear Icon' }} />
      </IconButton>
    </Badge>
    <div style={{ padding: '5px' }} />
    <Badge label="Badge with Icon Button">
      <IconButton aria-label="Clear Badge with Icon Button" variant="inverted">
        <Icon icon={Earth} ml="xs" size="14px" title={{ name: 'Earth Icon' }} />
      </IconButton>
    </Badge>
    <div style={{ padding: '5px' }} />
    <Badge label="Badge with Icon" bg="green">
      <Icon icon={ContentCopy} ml="xs" size="14px" color="white" aria-hidden="true" focusable="false" title={{ name: 'Copy Icon' }} />
    </Badge>
  </>
);

export const BadgeWithLeftSlotAndIcon = () => (
  <Badge label="Badge with Icon Button and Left Slot" bg="white" variant="itemBadgeWithSlot" slots={{ leftIcon: <Icon icon={VariableIcon} size={16} /> }}>
    <IconButton
      aria-label="delete"
      variant="badgeDeleteButton"
    >
      <Icon icon={Clear} size={14} title={{ name: 'Clear Icon' }} />
    </IconButton>
  </Badge>
);

export const StatusBadgeVariants = ({ ...args }) => (
  <Box>
    <Badge variant="criticalStatusBadge" {...args} label="Critical" mb="lg" />
    <Badge variant="warningStatusBadge" {...args} label="Warning" mb="lg" />
    <Badge variant="healthyStatusBadge" {...args} label="Healthy" mb="lg" />
    <Badge variant="activeStatusBadge" {...args} label="Active" />
  </Box>
);

StatusBadgeVariants.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.statusVariants,
  },
};
