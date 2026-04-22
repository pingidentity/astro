import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { CollapsiblePanel } from '../../index';
import { CollapsiblePanelProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import CollapsiblePanelReadme from './CollapsiblePanel.mdx';

export default {
  title: 'Components/CollapsiblePanel',
  component: CollapsiblePanel,
  parameters: {
    docs: {
      page: () => (
        <>
          <CollapsiblePanelReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    listTitle: {},
    openAriaLabel: {},
    closeAriaLabel: {},
    isDefaultOpen: {},
    isOpen: {
      onClick: { action: 'clicked' },
      control: false,
    },
  },
  args: {
    listTitle: '',
    openAriaLabel: 'Open filter menu?',
    closeAriaLabel: 'Close filter menu?',
  },
} as Meta;

export const Default: StoryFn<CollapsiblePanelProps<object>> = (
  args: CollapsiblePanelProps<object>,
) => (
  <CollapsiblePanel
    {...args}
    listTitle="Panel Title"
    selectedFilterCount={1000}
  />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.collapsiblePanel.default,
  },
};
