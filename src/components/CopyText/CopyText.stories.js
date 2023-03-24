import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  CopyText,
  Link,
  Text,
} from '../../index';

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
