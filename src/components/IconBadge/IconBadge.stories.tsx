import React from 'react';
import GroupIcon from '@pingux/mdi-react/AccountGroupIcon';
import ArrowIcon from '@pingux/mdi-react/ArrowTopRightThickIcon';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
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
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <IconBadgeReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

export const Default: StoryFn<IconBadgeProps> = args => (
  <Box>
    <IconBadge {...args} baseSize={25} circleSize={15}>
      <Icon
        icon={GroupIcon}
        size="25px"
        color="accent.40"
        title={{ name: 'Group Icon' }}
      />
      <Icon
        icon={ArrowIcon}
        size="13px"
        color="accent.40"
        title={{ name: 'Arrow Icon' }}
      />
    </IconBadge>
  </Box>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.iconBadge.default,
  },
};
