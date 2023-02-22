import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import Box from '../Box';

import HelpHintReadme from './HelpHint.mdx';
import HelpHint from '.';

export default {
  title: 'Components/HelpHint',
  component: HelpHint,
  parameters: {
    docs: {
      page: () => (
        <>
          <HelpHintReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    children: {
      description: 'Tooltip content',
      defaultValue: 'Text of the tooltip right here...',
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = args => (
  <Box p={50}>
    <HelpHint {...args} />
  </Box>
);

export const WithTooltipAndIconButtonProps = () => (
  <Box p={50}>
    <HelpHint tooltipProps={{ direction: 'bottom' }} iconButtonProps={{ 'aria-label': 'Help hint' }}>
      Text of the tooltip right here...
    </HelpHint>
  </Box>
);
