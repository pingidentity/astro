import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Button, ButtonBar } from '../../index';
import { ButtonBarProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import ButtonBarReadme from './ButtonBar.mdx';

export default {
  title: 'Components/ButtonBar',
  component: ButtonBar,
  parameters: {
    docs: {
      page: () => (
        <>
          <ButtonBarReadme />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: {
      mapComponent: {
        '@pingux/astro': ['Button', 'ButtonBar'],
      },
    },
  },
  argTypes: {
    align: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default: StoryFn<ButtonBarProps> = (args: ButtonBarProps) => (
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

export const RightAligned: StoryFn = args => (
  <ButtonBar {...args} align="right">
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

export const Secondary: StoryFn = args => (
  <ButtonBar {...args}>
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

export const SecondaryRightAligned: StoryFn = args => (
  <ButtonBar align="right" {...args}>
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
