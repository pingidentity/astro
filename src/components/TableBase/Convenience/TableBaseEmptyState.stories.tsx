import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import { Box, TableBaseEmptyState } from '../../../index';
import { TableBaseEmptyStateProps } from '../../../types/tableBase';

export default {
  title: 'Components/TableBase/Convenience/TableBaseEmptyState',
  component: TableBaseEmptyState,
  parameters: {
    docs: {
      page: () => <DocsLayout />,
    },
  },
  argTypes: {
    headerLabel: { control: { type: 'text' } },
    descriptionLabel: { control: { type: 'text' } },
    addButtonLabel: { control: { type: 'text' } },
    defaultIcon: { control: false },
  },
  args: {
    headerLabel: 'No items exist',
    descriptionLabel: 'Take action by doing x, y, z',
  },
} as Meta;

export const Default: StoryFn<TableBaseEmptyStateProps> = args => (
  <TableBaseEmptyState {...args} />
);

export const WithAddButton: StoryFn<TableBaseEmptyStateProps> = args => (
  <TableBaseEmptyState {...args} addButtonLabel="Add Item" />
);

export const Customization: StoryFn<TableBaseEmptyStateProps> = () => (
  <Box isRow={false} gap="xl">
    <TableBaseEmptyState
      headerLabel="No users found"
      descriptionLabel="Add your first user to get started."
      addButtonLabel="New User"
    />
    <TableBaseEmptyState
      headerLabel="No results"
      descriptionLabel="Try adjusting your search or filters."
    />
    <TableBaseEmptyState
      headerLabel="Nothing here yet"
      descriptionLabel="Create a new entry to see it listed here."
      addButtonLabel="Create Entry"
    />
  </Box>
);
