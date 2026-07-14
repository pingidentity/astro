import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Separator } from '../../index';
import { SeparatorProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

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
  argTypes: {
    orientation: {
      control: { type: 'select', description: 'Sets the orientation of the separator line.' },
      options: ['horizontal', 'vertical'],
    },
    ...ariaAttributeBaseArgTypes,
  } as unknown as Meta<typeof Separator>['argTypes'],
} satisfies Meta<typeof Separator>;

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

export const verticalSeparator = ({ ...args }) => (
  <Box height="50px" flexDirection="row" alignItems="center">
    Lorem ipsum
    <Separator {...args} orientation="vertical" sx={{ mx: '15px !important' }} />
    Lorem ipsum
    <Separator {...args} orientation="vertical" sx={{ mx: '15px !important' }} />
    Lorem ipsum
  </Box>
);
