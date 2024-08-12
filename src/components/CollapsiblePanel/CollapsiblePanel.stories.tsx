import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { CollapsiblePanel } from '../../index';
import { CollapsiblePanelProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import CollapsiblePanelReadme from './CollapsiblePanel.mdx';

export default {
  title: 'Components/CollapsiblePanel',
  component: CollapsiblePanel,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <CollapsiblePanelReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    listTitle: {},
    openAriaLabel: {},
    closeAriaLabel: {},
    isDefaultOpen: {},
    isOpen: {
      onClick: { action: 'clicked' },
      control: {
        type: 'none',
      },
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
  />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.collapsiblePanel.default,
  },
};
