import React from 'react';
import { StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, EmptyState } from '../..';
import { EmptyStateProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import EmptyStateReadme from './EmptyState.mdx';
import { emptyStateArgTypes } from './emptyStateAttributes';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      page: () => (
        <>
          <EmptyStateReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    ...emptyStateArgTypes,
  },
};

export const Default: StoryFn<EmptyStateProps> = (args: EmptyStateProps) => (
  <EmptyState
    {...args}
  />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.emptyState?.default,
  },
};

export const WithDescription: StoryFn<EmptyStateProps> = (args: EmptyStateProps) => (
  <EmptyState
    heading="No users found"
    description="Try a different name, username, or email address."
    {...args}
  />
);

export const WithButton: StoryFn<EmptyStateProps> = args => (
  <EmptyState
    heading="No users yet"
    description="Add your first user to start managing identities in this environment."
    buttonLabel="New User"
    onButtonPress={() => jest.fn()()}
    {...args}
  />
);

export const Customization: StoryFn<EmptyStateProps> = () => (
  <Box isRow={false} gap="xl">
    <EmptyState heading="No items exist" />
    <EmptyState
      heading="No results found"
      description="Try a different query."
      iconProps={{
        icon: 'person_add',
      }}
    />
    <EmptyState
      heading="No users yet"
      description="Add your first user to start managing identities in this environment."
      buttonLabel="New User"
      onButtonPress={() => jest.fn()()}
      iconProps={{
        icon: 'search_off',
      }}
    />
  </Box>
);
