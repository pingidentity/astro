import React from 'react';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';
import { StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Button,
  Icon,
  Text,
} from '../../index';
import { ButtonProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import ButtonReadme from './Button.mdx';
import { buttonArgTypes } from './buttonAttributes';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [withDesign],
  argTypes: {
    ...buttonArgTypes,
  },
  args: {
    variant: 'default',
    children: 'Button Text',
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

export const Default: StoryFn<ButtonProps> = (args: ButtonProps) => (
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
  <Button mb="sm" variant="withIcon">
    <Box isRow alignItems="center">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="active"
        size={20}
        title={{ name: 'Add Circle Icon' }}
      />
      Add a Form
    </Box>
  </Button>
);

export const InlineButton = () => (
  <Box>
    <Button mb="sm" mr="auto" variant="inline">
      Inline
    </Button>
    <Button mb="sm" mr="auto" variant="inlineWithIcon">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="active"
        size={15}
        title={{ name: 'Add Circle Icon' }}
      />
      Inline with icon
    </Button>
    <Button mb="sm" mr="auto" variant="inlinePrimary">
      Inline primary
    </Button>
    <Button mb="sm" mr="auto" variant="inlinePrimaryWithIcon">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="active"
        size={15}
        title={{ name: 'Add Circle Icon' }}
      />
      Inline primary with icon
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
