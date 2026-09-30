import React from 'react';
import GroupIcon from '@pingux/mdi-react/AccountGroupIcon';
import AccountMultipleOutlineIcon from '@pingux/mdi-react/AccountMultipleOutlineIcon';
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

const colorIdToHashTo = {
  blue: 'color-13',
  green: 'color-6',
  purple: 'color-7',
  cyan: 'color-5',
  pink: 'color-8',
  orange: 'color-4',
  red: 'color-9',
  yellow: 'color-11',
  teal: 'color-10',
  indigo: 'color-12',
};

const twotoneColorNames = [
  'blue',
  'green',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'teal',
  'cyan',
  'indigo',
];


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
    colorId: {
      description: 'A unique id used to deterministically assign a twotone color to the child icons (Onyx themes only). Resolved with the same FNV-1a hashing approach as IconWrapper and Avatar.',
      control: { type: 'text' },
    },
    ...ariaAttributeBaseArgTypes,
  } as unknown as Meta<typeof IconBadge>['argTypes'],
} satisfies Meta<typeof IconBadge>;

export const Default: StoryFn<IconBadgeProps> = args => {
  const { themeState: { isOnyx, isOnyxDark } } = useGetTheme();

  const iconColor = () => {
    if (isOnyxDark) return 'gray-400';
    if (isOnyx) return 'gray-800';
    return 'badge.iconBadgeFill';
  };

  const circleColor = () => {
    if (isOnyxDark) return 'gray-700';
    if (isOnyx) return 'gray-100';
    return undefined;
  };

  if (isOnyx) {
    return (
      <Box flexWrap="wrap" gap="md">
        {twotoneColorNames.map(colorName => (
          <IconBadge
            key={colorName}
            baseSize={24}
            circleSize={10}
            colorId={colorIdToHashTo[colorName]}
          >
            <Icon
              icon={AccountMultipleOutlineIcon}
              title={{ name: `${colorName} icon` }}
            />
            <Icon
              icon={ArrowIcon}
              size="xxs"
              title={{ name: `${colorName} badge icon` }}
            />
          </IconBadge>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <IconBadge {...args} baseSize={25} circleSize={15} circleColor={circleColor()}>
        <Icon
          icon={GroupIcon}
          size="25px"
          color={iconColor()}
          title={{ name: 'Group Icon' }}
        />
        <Icon
          icon={ArrowIcon}
          size="13px"
          color={iconColor()}
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
