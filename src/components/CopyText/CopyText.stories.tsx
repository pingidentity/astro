import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  CopyText,
  Link,
  Text,
  TextField,
} from '../../index';
import { CopyTextProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

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
} satisfies Meta<typeof CopyText>;

export const Default: StoryFn<CopyTextProps> = (args: CopyTextProps) => (
  <CopyText {...args}>
    <Text>Lorem ipsum</Text>
  </CopyText>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.copyText.default,
  },
};

export const WithLink: StoryFn<CopyTextProps> = (args: CopyTextProps) => (
  <CopyText {...args} mode="link">
    <Link href="https://lorem.ipsum">https://lorem.ipsum</Link>
  </CopyText>
);

export const WithChangedCopiedValue: StoryFn<CopyTextProps> = (args: CopyTextProps) => (
  <>
    <CopyText {...args} textToCopy="Sed ut perspiciatis">
      <Text>Lorem ipsum</Text>
    </CopyText>
    <TextField maxWidth="300px" mt="lg" label="Paste Here" />
  </>
);
