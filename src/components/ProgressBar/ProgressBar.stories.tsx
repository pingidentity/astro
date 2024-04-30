import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { ProgressBar, ProgressBarProps } from '../../index';

import ProgressBarReadMe from './ProgressBar.mdx';

export default {
  title: 'Experimental/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      page: () => (
        <>
          <ProgressBarReadMe />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    isIndeterminate: {
      table: {
        disable: true,
      },
    },
    'data-testid': {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
    showValueLabel: {
      table: {
        disable: true,
      },
    },
    valueLabel: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

export const Default: StoryFn<ProgressBarProps> = (args: ProgressBarProps) => {
  return <ProgressBar {...args} value={25} aria-label="Progress Bar" />;
};
