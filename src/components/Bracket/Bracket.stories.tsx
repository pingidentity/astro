import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Bracket,
} from '../../index';
import { BracketProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import BracketReadme from './Bracket.mdx';

export default {
  title: 'Components/Bracket',
  component: Bracket,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <BracketReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

export const Default: StoryFn<BracketProps> = () => {
  return (
    <Box p="md" ml="sm">
      <Bracket />
    </Box>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.bracket.default,
  },
};

export const IsLast = () => {
  return (
    <Box p="md" ml="sm">
      <Bracket isLast />
    </Box>
  );
};

IsLast.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.bracket.isLast,
  },
};
