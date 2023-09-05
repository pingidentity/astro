import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, HelpHint, Link, Text } from '../../index';
import { isSafari } from '../../styles/safariAgent';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

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
};

export const Default = args => (
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

export const WithPopoverAndIconButtonProps = () => (
  <Box p={50}>
    <HelpHint popoverProps={{ direction: 'bottom' }} iconButtonProps={{ 'aria-label': 'Help hint' }}>
      Text of the popover right here...
    </HelpHint>
  </Box>
);

export const ContentWithLink = () => (
  <Box p={70}>
    <HelpHint>
      <Text variant="popover">Text of the popover right here... </Text>
      {/* TODO: In safari the Link component inside the Popover is not working as intended */}
      {isSafari ? (
        <Box href="https://uilibrary.ping-eng.com/" as="a" pl="xs">
          <Link variant="popover">
            Learn More
          </Link>
        </Box>
      ) : <Link variant="popover" href="https://uilibrary.ping-eng.com/">Learn More</Link> }
    </HelpHint>
  </Box>
);

ContentWithLink.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.helpHint.withLink,
  },
};

export const WithDelay = args => (
  <Box p={50}>
    <HelpHint {...args} closeDelay={5000} />
  </Box>
);
