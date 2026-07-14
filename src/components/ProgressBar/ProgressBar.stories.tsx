import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { ProgressBar, ProgressBarProps } from '../../index';

import ProgressBarReadMe from './ProgressBar.mdx';
import { progressBarArgTypes } from './progressBarAttributes';

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
    },
  },
  argTypes: progressBarArgTypes as unknown as Meta<typeof ProgressBar>['argTypes'],
} satisfies Meta<typeof ProgressBar>;

export const Default: StoryFn<ProgressBarProps> = (args: ProgressBarProps) => {
  return <ProgressBar {...args} value={25} aria-label="Progress Bar" />;
};
