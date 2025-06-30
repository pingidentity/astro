import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Avatar } from '../../index';
import { AvatarProps } from '../../types/avatar';
import { pingImg } from '../../utils/devUtils/constants/images';

import AvatarReadme from './Avatar.mdx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <AvatarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    src: {
      control: {
        type: 'none',
      },
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'Size of the avatar. Can be a string. like 50px',
    },
    alt: {
      control: {
        type: 'text',
      },
      description: 'Alternative text for the image.',
    },
    defaultText: {
      control: {
        type: 'text',
      },
      description: 'Default text to be displayed when src is not available.',
    },
  },
  args: {
    src: pingImg,
  },
} as Meta;

export const Default: StoryFn<AvatarProps> = ({ ...args }) => (
  <Avatar {...args} />
);
