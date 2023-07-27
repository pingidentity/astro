import React from 'react';
import AddCircleIcon from '@pingux/mdi-react/AddCircleIcon';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Button,
  Icon,
  Text,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';
import { buttonVariants } from '../../utils/devUtils/constants/variants';

import ButtonReadme from './Button.mdx';

// removing the iconButton variants from this story.
const variants = buttonVariants;
delete variants.ICON;
delete variants.ICON_BUTTON;
delete variants.INVERTED;

// add designer approved variants for devs to use here
const variantOptions = [
  'critical',
  'default',
  'inline',
  'inlinePrimary',
  'link',
  'primary',
];

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [withDesign],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: variantOptions,
      },
      defaultValue: 'default',
    },
    children: {
      description: 'Button text.',
      defaultValue: 'Button Text',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <ButtonReadme />
          <DocsLayout />
        </>
      ),
    },
  },
};

export const Default = args => (
  <Button {...args} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.default,
  },
};

export const Disabled = () => (
  <Button isDisabled>
    Button Text
  </Button>
);

export const TextIconButton = () => (
  <Button mb="sm">
    <Box isRow alignItems="center">
      <Icon icon={AddCircleIcon} mr="sm" color="active" size={20} title={{ name: 'Add Circle Icon' }} />
      Add a Form
    </Box>
  </Button>
);

export const InlineButton = () => (
  <Box>
    <Button mb="sm" mr="auto" variant="inline">
      Inline
    </Button>
    <Button mb="sm" mr="auto" variant="inlinePrimary">
      Inline primary
    </Button>
  </Box>
);

export const ColorBlockButton = args => {
  // Change `isConfigured` property in storybook controls
  const { isConfigured, ...props } = args;

  return (
    <Button {...props} variant="colorBlock" className={isConfigured ? 'is-configured' : ''}>
      <Box>
        <Text variant="buttonTitle">Title</Text>
        <Text variant="buttonSubtitle">Info</Text>
      </Box>
      <Icon icon={CreateIcon} title={{ name: 'Create Icon' }} />
    </Button>
  );
};

ColorBlockButton.argTypes = {
  isConfigured: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
};

export const Critical = () => (
  <Button variant="critical">
    Button Text
  </Button>
);

export const Primary = () => (
  <Button variant="primary">
    Button Text
  </Button>
);
