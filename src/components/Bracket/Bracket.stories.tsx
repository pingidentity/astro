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
      page: () => (
        <>
          <BracketReadme />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: {
      mapComponent: {
        '@pingux/astro': ['Box', 'Bracket'],
      },
    },
  },
  argTypes: {
    isLast: {
      control: {
        type: 'boolean',
      },
      description: 'If true, the bracket will be displayed as the last one.',
    },
    color: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: false,
    },
    as: {
      control: false,
    },
    role: {
      control: false,
    },
    'data-testid': {
      control: false,
    },
  },
} as Meta;

export const Default: StoryFn<BracketProps> = args => {
  return (
    <Box p="md" ml="sm">
      <Bracket {...args} />
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
