import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Button, ButtonBar } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import ButtonBarReadme from './ButtonBar.mdx';

export default {
  title: 'Components/ButtonBar',
  component: ButtonBar,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <ButtonBarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    align: {
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = args => (
  <ButtonBar {...args}>
    <Button
      variant="primary"
      data-id="save-button"
      onPress={() => alert('Save button pressed')}
    >
      Save
    </Button>
    <Button
      variant="link"
      data-id="cancel-button"
      onPress={() => alert('Cancel button pressed')}
    >
      Cancel
    </Button>
  </ButtonBar>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.buttonBar.default,
  },
};

export const RightAligned = () => (
  <ButtonBar align="right">
    <Button
      variant="primary"
      data-id="next-button"
      onPress={() => alert('Next button pressed')}
    >
      Next
    </Button>
    <Button
      variant="link"
      data-id="cancel-button"
      onPress={() => alert('Cancel button pressed')}
    >
      Cancel
    </Button>
  </ButtonBar>
);

RightAligned.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.buttonBar.rightAligned,
  },
};
