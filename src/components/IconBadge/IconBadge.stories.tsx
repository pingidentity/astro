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
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

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
  argTypes: {
    baseSize: {
      description: 'The size of the base icon; number values are converted to pixels.',
      control: { type: 'text' },
    },
    circleColor: {
      description: 'Color applied to the circular background; defaults to white.',
      control: { type: 'text' },
    },
    circleSize: {
      description: 'The size of the icon rendered inside the circle; number values are converted to pixels.',
      control: { type: 'number' },
    },
    ...ariaAttributeBaseArgTypes,
  } as unknown as Meta<typeof IconBadge>['argTypes'],
} satisfies Meta<typeof IconBadge>;

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
