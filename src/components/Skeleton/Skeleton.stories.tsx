import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Avatar, Box, Card, Skeleton, Text } from '../../index';
import { SkeletonProps } from '../../types';
import { pingImg } from '../../utils/devUtils/constants/images';

import SkeletonReadme from './Skeleton.mdx';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <SkeletonReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'none',
      },
    },
  },
} as Meta;

export const Default: StoryFn<SkeletonProps> = ({ ...args }) => (
  <Box width="200px">
    <Skeleton variant="text" fontSize="1rem" {...args} />
    <Skeleton variant="circular" width="40px" height="40px" mt="sm" {...args} />
    <Skeleton variant="rounded" height="60px" width="200px" mt="sm" {...args} />
  </Box>
);

export const inferringDimensions = () => {
  const isLoaded = true;
  return (
    <Box width="200px">
      <Box mb="sm" isRow alignItems="center" gap="md">
        {
          isLoaded && (
            <Skeleton variant="circular">
              <Avatar src={pingImg} />
            </Skeleton>
          )
        }
        <Box flex="1 1 0">
          <Skeleton variant="text">
            {isLoaded && <Text variant="h1">.</Text>}
          </Skeleton>
        </Box>
      </Box>
      <Box mb="sm">
        <Skeleton variant="rounded">
          {isLoaded && <Box height={100} />}
        </Skeleton>
      </Box>
    </Box>
  );
};
