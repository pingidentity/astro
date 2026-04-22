import React from 'react';
import CogOutlineIcon from '@pingux/mdi-react/CogOutlineIcon';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Avatar, Box, IconWrapper } from '../../index';
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
    },
  },
  argTypes: {
    src: {
      control: false,
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

export const SizeVariation: StoryFn<AvatarProps> = () => (
  <Box isRow gap="sm" alignItems="center">
    <Avatar size="sm" color="green" />
    <Avatar size="md" color="green" />
    <Avatar size="lg" color="green" />
    <Avatar size="xl" color="green" />
  </Box>
);

export const ColorVariation: StoryFn<AvatarProps> = () => (
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

export const IconVariation: StoryFn<AvatarProps> = () => (
  <Avatar color="green">
    <IconWrapper
      icon={CogOutlineIcon}
      color="green"
      size="xs"
      title={{ name: 'Cog Outline Icon' }}
    />
  </Avatar>
);

export const ImageVariation: StoryFn<AvatarProps> = ({ ...args }) => (
  <Avatar {...args} />
);

export const SquareVariation: StoryFn<AvatarProps> = () => (
  <Box isRow gap="sm" alignItems="center">
    <Avatar color="green" isSquare />
    <Avatar color="green" isSquare size="xmd" />
    <Avatar color="green" isSquare size="lg" />
    <Avatar color="green" isSquare size="xl" />
  </Box>
);


export const LogoVariation: StoryFn<AvatarProps> = args => (
  <Box isRow gap="sm" alignItems="center">
    <Avatar {...args} isSquare isLogo />
    <Avatar {...args} isSquare size="xmd" isLogo />
    <Avatar {...args} isSquare size="lg" isLogo />
    <Avatar {...args} isSquare size="xl" isLogo />
  </Box>
);
