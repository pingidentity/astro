import React from 'react';
import Clear from '@pingux/mdi-react/CloseIcon';
import CogIcon from '@pingux/mdi-react/CogIcon';
import PencilOutlineIcon from '@pingux/mdi-react/PencilOutlineIcon';
import PlusCircleMultipleOutlineIcon from '@pingux/mdi-react/PlusCircleMultipleOutlineIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useGetTheme } from '../../hooks';
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
      page: () => (
        <>
          <BadgeReadme />
          <DocsLayout />
        </>
      ),
    },
  },
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

export const CountBadge = args => (
  <Box isRow gap="xs">
    <Badge {...args} label="4" variant="countBadge" />
    <Badge {...args} label="4" variant="countNeutral" />
  </Box>
);

CountBadge.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.countBadge,
  },
};

export const BadgeWithCustomColors = args => {
  const { themeState: { isOnyx } } = useGetTheme();
  const bg = isOnyx ? 'indigo-100' : 'green';
  const textColor = isOnyx ? 'cyan-800' : 'white';
  return (
    <Badge {...args} label="Custom Colors" bg={bg} textColor={textColor} sx={{ color: textColor }} />
  );
};

export const BadgeWithIcon = () => {
  const { themeState: { isOnyx } } = useGetTheme();

  return (
    <Box gap="10px">
      {
        !isOnyx ? (
          <>
            <Badge label="Badge with Icon Button" bg="navy" textColor="white">
              <IconButton aria-label="Setting Badge with Icon Button" variant="inverted" ml="xs">
                <Icon icon={CogIcon} size="14px" title={{ name: 'Setting Icon' }} />
              </IconButton>
            </Badge>

            <Badge label="Badge with Icon Button">
              <IconButton aria-label="Clear Badge with Icon Button" variant="inverted" ml="xs">
                <Icon icon={Clear} size="14px" title={{ name: 'Clear Icon' }} />
              </IconButton>
            </Badge>

            <Badge label="Badge with Icon" bg="green" textColor="white">
              <Icon icon={PencilOutlineIcon} ml="xs" size="14px" color="white" aria-hidden="true" focusable="false" title={{ name: 'Edit Icon' }} />
            </Badge>
          </>
        ) : (
          <>
            <Badge label="Badge with Icon Button" variant="primary">
              <IconButton aria-label="Setting Badge with Icon Button" ml="xs">
                <Icon icon={CogIcon} size="xxs" title={{ name: 'Setting Icon' }} />
              </IconButton>
            </Badge>

            <Badge label="Badge with Icon Button">
              <IconButton aria-label="Clear Badge with Icon Button" ml="xs">
                <Icon icon={Clear} size="xxs" title={{ name: 'Clear Icon' }} />
              </IconButton>
            </Badge>

            <Badge label="Badge with Icon" variant="success">
              <Icon icon={PencilOutlineIcon} ml="xs" size="14px" aria-hidden="true" focusable="false" title={{ name: 'Edit Icon' }} />
            </Badge>
          </>
        )
      }
    </Box>
  );
};

export const BadgeWithLeftSlotAndIcon = () => (
  <Badge
    label="Badge with Icon Button and Left Slot"
    bg="white"
    variant="itemBadgeWithSlot"
    slots={{ leftIcon: <Icon icon={PlusCircleMultipleOutlineIcon} size={16} color="text.primary" /> }}
  >
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
    <Badge {...args} variant="criticalStatusBadge" label="Critical" mb="lg" />
    <Badge {...args} variant="warningStatusBadge" label="Warning" mb="lg" />
    <Badge {...args} variant="healthyStatusBadge" label="Healthy" mb="lg" />
    <Badge {...args} variant="activeStatusBadge" label="Active" />
  </Box>
);

StatusBadgeVariants.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.badge.statusVariants,
  },
};
