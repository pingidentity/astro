import React from 'react';
import CogOutlineIcon from '@pingux/mdi-react/CogOutlineIcon';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Avatar, Box, IconWrapper } from '../../index';
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

export const WithSizeVariation: StoryFn<AvatarProps> = () => (
  <Box isRow gap="sm" alignItems="center">
    <Avatar size="sm" color="green" />
    <Avatar size="md" color="green" />
    <Avatar size="lg" color="green" />
    <Avatar size="xl" color="green" />
  </Box>
);

export const WithColorVariation: StoryFn<AvatarProps> = () => (
  <Box isRow gap="sm" alignItems="center">
    <Avatar color="green" />
    <Avatar color="purple" />
    <Avatar color="pink" />
    <Avatar color="red" />
    <Avatar color="orange" />
    <Avatar color="yellow" />
    <Avatar color="teal" />
    <Avatar color="cyan" />
    <Avatar color="blue" />
    <Avatar color="indigo" />
  </Box>
);

export const WithIconVariation: StoryFn<AvatarProps> = () => (
  <Avatar color="green">
    <IconWrapper
      icon={CogOutlineIcon}
      color="green"
      size="xs"
      title={{ name: 'Cog Outline Icon' }}
    />
  </Avatar>
);

export const WithImageVariation: StoryFn<AvatarProps> = ({ ...args }) => (
  <Avatar {...args} />
);

export const WithSquareVariation: StoryFn<AvatarProps> = () => (
  <Avatar color="green" isSquare />
);
