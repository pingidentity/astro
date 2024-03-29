import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, HelpHint, Link, Text } from '../../index';
import { HelpHintProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import HelpHintReadme from './HelpHint.mdx';

export default {
  title: 'Components/HelpHint',
  component: HelpHint,
  decorators: [withDesign],
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
      description: 'Popover content',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    children: 'Text of the popover right here...',
  },
} as Meta;

export const Default: StoryFn<HelpHintProps> = (args: HelpHintProps) => (
  <Box p={50}>
    <HelpHint {...args} />
  </Box>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.helpHint.default,
  },
};

export const WithPopoverAndIconButtonProps: StoryFn = () => (
  <Box p={50}>
    <HelpHint popoverProps={{ 'data-testid': 'popover-container' }} iconButtonProps={{ 'aria-label': 'Help hint' }} direction="bottom">
      Text of the popover right here...
    </HelpHint>
  </Box>
);

export const ContentWithLink: StoryFn = () => (
  <Box p={70}>
    <HelpHint>
      <Text variant="popover">Text of the popover right here... </Text>
      <Link variant="popover" href="https://uilibrary.ping-eng.com/" target="_blank">Learn More</Link>
    </HelpHint>
  </Box>
);

ContentWithLink.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.helpHint.withLink,
  },
};

export const WithDelay: StoryFn = (args: HelpHintProps) => (
  <Box p={50}>
    <HelpHint {...args} closeDelay={5000} />
  </Box>
);
