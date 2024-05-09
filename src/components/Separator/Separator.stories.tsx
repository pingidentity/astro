import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Separator } from '../../index';
import { SeparatorProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

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
} as Meta;

export const Default: StoryFn<SeparatorProps> = ({ ...args }) => (
  <Box width="400px">
    Lorem ipsum dolor sit amet
    <Separator {...args} sx={{ my: 'md' }} />
    Lorem ipsum dolor sit amet
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
    Lorem ipsum
    <Separator orientation="vertical" sx={{ mx: '15px !important' }} />
    Lorem ipsum
    <Separator orientation="vertical" sx={{ mx: '15px !important' }} />
    Lorem ipsum
  </Box>
);
