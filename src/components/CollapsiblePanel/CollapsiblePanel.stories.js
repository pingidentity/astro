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
    listTitle: 'Selected Groups',
    openAriaLabel: 'Open filter menu?',
    closeAriaLabel: 'Close filter menu?',
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
