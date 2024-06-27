import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Grid, Text } from '../../index';
import { GridProps } from '../../types';

import GridReadme from './Grid.mdx';

export default {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    docs: {
      page: () => (
        <>
          <GridReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

export const Default: StoryFn<GridProps> = () => (
  <>
    <Text mb="sm" fontStyle="italic">Minimum width of child elements at responsive breakpoints</Text>
    <Grid width={[128, null, 192]}>
      <Box bg="accent.90">Box</Box>
      <Box bg="neutral.80">Box</Box>
      <Box bg="accent.90">Box</Box>
      <Box bg="neutral.80">Box</Box>
    </Grid>

    <Text mt="xl" mb="sm" fontStyle="italic">Defined number of equally-sized columns at responsive breakpoints</Text>
    <Grid gap={2} columns={[2, null, 4]}>
      <Box bg="accent.90">Box</Box>
      <Box bg="neutral.80">Box</Box>
      <Box bg="accent.90">Box</Box>
      <Box bg="neutral.80">Box</Box>
    </Grid>

    <Text mt="xl" mb="sm" fontStyle="italic">Columns using grid syntax sizing at responsive breakpoints</Text>
    <Grid gap={2} columns={[2, '1fr 2fr']}>
      <Box bg="accent.90">Box</Box>
      <Box bg="neutral.80">Box</Box>
      <Box bg="accent.90">Box</Box>
      <Box bg="neutral.80">Box</Box>
    </Grid>
  </>
);
