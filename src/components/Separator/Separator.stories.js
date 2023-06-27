import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Separator } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

import SeparatorReadme from './Separator.mdx';

export default {
  title: 'Components/Separator',
  component: Separator,
  decorators: [withDesign],
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

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.separator.default,
  },
};

export const verticalSeparator = () => (
  <Box height="50px" flexDirection="row" alignItems="center">
    Content left
    <Separator orientation="vertical" />
    Content right
  </Box>
);
