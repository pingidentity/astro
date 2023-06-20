import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Separator } from '../../index';

import SeparatorReadme from './Separator.mdx';

export default {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    docs: {
      page: () => (
        <>
          <SeparatorReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

export const Default = ({ ...args }) => (
  <Box height="60px" alignItems="center">
    Content above
    <Separator {...args} />
    Content below
  </Box>
);

export const verticalSeparator = () => (
  <Box height="50px" flexDirection="row" alignItems="center">
    Content left
    <Separator orientation="vertical" />
    Content right
  </Box>
);
