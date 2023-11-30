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
      variant="link"
      data-id="cancel-button"
      onPress={() => alert('Cancel button pressed')}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      data-id="next-button"
      onPress={() => alert('Next button pressed')}
    >
      Next
    </Button>
  </ButtonBar>
);

RightAligned.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.buttonBar.rightAligned,
  },
};

export const Secondary = () => (
  <ButtonBar>
    <Button
      variant="primary"
      data-id="save-button"
      onPress={() => alert('Save button pressed')}
    >
      Save
    </Button>
    <Button
      data-id="close-button"
      onPress={() => alert('Close button pressed')}
    >
      Close
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

Secondary.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.buttonBar.secondary,
  },
};

export const SecondaryRightAligned = () => (
  <ButtonBar align="right">
    <Button
      variant="link"
      data-id="cancel-button"
      onPress={() => alert('Cancel button pressed')}
    >
      Cancel
    </Button>
    <Button
      data-id="close-button"
      onPress={() => alert('Close button pressed')}
    >
      Close
    </Button>
    <Button
      variant="primary"
      data-id="next-button"
      onPress={() => alert('Next button pressed')}
    >
      Next
    </Button>
  </ButtonBar>
);

SecondaryRightAligned.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.buttonBar.secondaryRightAligned,
  },
};
