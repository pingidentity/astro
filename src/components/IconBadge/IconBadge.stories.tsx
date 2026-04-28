import React from 'react';
import GroupIcon from '@pingux/mdi-react/AccountGroupIcon';
import ArrowIcon from '@pingux/mdi-react/ArrowTopRightThickIcon';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useGetTheme } from '../../hooks';
import {
  Box,
  Icon,
  IconBadge,
} from '../../index';
import { IconBadgeProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import IconBadgeReadme from './IconBadge.mdx';

export default {
  title: 'Components/IconBadge',
  component: IconBadge,
  parameters: {
    docs: {
      page: () => (
        <>
          <IconBadgeReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

export const Default: StoryFn<IconBadgeProps> = args => {
  const { themeState: { isOnyx, isOnyxDark } } = useGetTheme();

  const getIconColor = () => {
    if (isOnyxDark) return 'gray-400';
    if (isOnyx) return 'gray-800';
    return 'badge.iconBadgeFill';
  };

  const getCircleColor = () => {
    if (isOnyxDark) return 'gray-700';
    if (isOnyx) return 'gray-100';
    return undefined;
  };

  const iconColor = getIconColor();
  const circleColor = getCircleColor();

  return (
    <Box>
      <IconBadge {...args} baseSize={25} circleSize={15} circleColor={circleColor}>
        <Icon
          icon={GroupIcon}
          size="25px"
          color={iconColor}
          title={{ name: 'Group Icon' }}
        />
        <Icon
          icon={ArrowIcon}
          size="13px"
          color={iconColor}
          title={{ name: 'Arrow Icon' }}
        />
      </IconBadge>
    </Box>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.iconBadge.default,
  },
};
