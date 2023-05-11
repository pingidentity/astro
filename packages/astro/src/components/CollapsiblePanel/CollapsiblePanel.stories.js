import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  CollapsiblePanel,
} from '../../index';

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
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    listTitle: {
      defaultValue: 'Selected Groups',
    },
    openAriaLabel: {
      defaultValue: 'Open filter menu?',
    },
    closeAriaLabel: {
      defaultValue: 'Close filter menu?',
    },
    isDefaultOpen: {},
    isOpen: {
      onClick: { action: 'clicked' },
      control: {
        type: 'none',
      },
    },
  },
};

export const Default = args => (
  <CollapsiblePanel
    {...args}
  />
);
