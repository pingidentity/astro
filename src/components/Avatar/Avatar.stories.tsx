import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Avatar } from '../../index';
import { AvatarProps } from '../../types/avatar';
import { pingImg } from '../../utils/devUtils/constants/images';

import AvatarReadme from './Avatar.mdx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: () => (
        <>
          <AvatarReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    src: {
      control: {
        type: 'none',
      },
    },
  },
  args: {
    src: pingImg,
  },
} as Meta;

export const Default: StoryFn<AvatarProps> = ({ ...args }) => (
  <Avatar {...args} />
);
