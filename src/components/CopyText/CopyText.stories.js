import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  CopyText,
  Link,
  Text,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

import CopyTextReadme from './CopyText.mdx';

export default {
  title: 'Components/CopyText',
  component: CopyText,
  decorators: [
    Story => (
      <Box pt="10px">
        <Story />
      </Box>
    ),
    withDesign,
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <CopyTextReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    mode: {
      control: 'none',
    },
  },
};

export const Default = args => (
  <CopyText {...args}>
    <Text>Here is a value</Text>
  </CopyText>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.copyText.default,
  },
};

export const WithLink = args => (
  <CopyText {...args} mode="link">
    <Link href="https://a.url.com">https://a.url.com</Link>
  </CopyText>
);

export const WithChangedCopiedValue = args => (
  <CopyText {...args} textToCopy="Here is a copied value">
    <Text>Here is a value</Text>
  </CopyText>
);
