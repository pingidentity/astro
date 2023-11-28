import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Bracket,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.ts';

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
};

export const Default = () => {
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
