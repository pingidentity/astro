import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, Button, Link, Text } from '../../index';
import { LinkProps } from '../../types/link';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { htmlElements } from '../../utils/devUtils/constants/htmlElements';

import LinkReadme from './Link.mdx';
import variants from './Link.styles';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      page: () => (
        <>
          <LinkReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    href: {
      control: {
        type: 'text',
      },
    },
    isDisabled: {},
    isSafariCompatible: {
      table: {
        disable: true,
      },
    },
    as: {
      control: {
        type: 'select',
      },
      options: htmlElements,
    },
    target: {
      control: false,
    },
    variant: {
      control: {
        type: 'select',
        options: [...Object.keys(variants), 'button'],
      },
    },
  },
  args: {
    href: 'https://uilibrary.ping-eng.com/',
    as: 'a',
    target: '_blank',
  },
} as Meta;

export const Default: StoryFn<LinkProps> = ({ ...args }) => (
  <div style={{ width: 'max-content' }}>
    <Text>
      <Link {...args}>Lorem ipsum</Link>
      {' '}
      dolor sit amet, consectetur adipiscing elit
    </Text>
  </div>
);

export const SkipToMain: StoryFn<LinkProps> = () => (
  <Box gap="md">
    <Link
      variant="skip"
      sx={{ '&.is-focused': { top: '100px' } }}
      href="#main"
    >
      Skip to main content
    </Link>
    <Box id="main">
      <Text>
        Click inside the story, and move focus using the tab key to see the skip link in action.
      </Text>
    </Box>
  </Box>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.link.default,
  },
  a11y: {
    config: {
      rules: [{ id: 'link-in-text-block', enabled: false }],
    },
  },
};
