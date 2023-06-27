import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  CollapsiblePanel,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

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

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.collapsiblePanel.default,
  },
};
