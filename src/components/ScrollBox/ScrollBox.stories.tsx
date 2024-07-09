import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, ScrollBox } from '../../index';
import { ScrollBoxProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import ScrollBoxReadme from './ScrollBox.mdx';

export default {
  title: 'Components/ScrollBox',
  component: ScrollBox,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <ScrollBoxReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    maxHeight: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    maxHeight: '100px',
  },
} as Meta;

export const Default: StoryFn<ScrollBoxProps> = args => (
  <ScrollBox maxHeight="100px" {...args}>
    <Box
      sx={{
        height: '150px',
        color: 'text.primary',
        fontSize: 'md',
      }}
    >
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
        quasi architecto beatae vitae
        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
        aut odit aut fugit,
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        Neque porro quisquam est,
        qui dolorem ipsum quia dolor sit amet, consectetur,
        adipisci velit, sed quia non numquam eius modi tempora incidunt ut
        labore et dolore magnam aliquam quaerat voluptatem.
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
        voluptate velit esse quam nihil molestiae consequatur,
        vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
    </Box>
  </ScrollBox>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.scrollBox.default,
  },
};
