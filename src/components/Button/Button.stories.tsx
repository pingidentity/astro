import React from 'react';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';
import { Meta, StoryFn } from '@storybook/react';
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
      page: () => (
        <>
          <ButtonReadme />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: {
      mapComponent: {
        '@pingux/astro': ['Box', 'Button', 'Icon', 'Text'],
        '@pingux/mdi-react/PlusIcon': 'PlusIcon',
        '@pingux/mdi-react/CreateIcon': 'CreateIcon',
      },
    },
  },
} as Meta;

export const Default: StoryFn<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.default,
  },
};

export const Primary = args => (
  <Button {...args} variant="primary">
    Button Text
  </Button>
);

Primary.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.primary,
  },
};

export const Critical = args => (
  <Button {...args} variant="critical">
    Button Text
  </Button>
);

Critical.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.critical,
  },
};

export const InlineButton = args => (
  <Box>
    <Button {...args} mb="sm" mr="auto" variant="inline">
      Button Text
    </Button>
    <Button {...args} mb="sm" mr="auto" variant="inlinePrimary">
      Button Text
    </Button>
  </Box>
);

InlineButton.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.inlineButton,
  },
};

export const TextIconButton = args => (
  <Box width={20}>
    <Button {...args} mb="sm" variant="withIcon">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="accent.30"
        size={20}
        title={{ name: 'Add Circle Icon' }}
      />
      Button Text
    </Button>
    <Button {...args} mb="sm" variant="primaryWithIcon">
      <Icon
        mr="xs"
        icon={PlusIcon}
        color="white"
        size={20}
        title={{ name: 'Add Circle Icon' }}
      />
      Button Text
    </Button>
    <Button {...args} mb="sm" mr="auto" variant="inlineWithIcon">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="accent.30"
        size={15}
        title={{ name: 'Add Circle Icon' }}
      />
      Button Text
    </Button>
    <Button {...args} mb="sm" mr="auto" variant="inlinePrimaryWithIcon">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="accent.30"
        size={15}
        title={{ name: 'Add Circle Icon' }}
      />
      Button Text
    </Button>
  </Box>
);

TextIconButton.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.textIconButton,
  },
};

export const Disabled = args => (
  <Button {...args} isDisabled>
    Button Text
  </Button>
);

Disabled.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.disabled,
  },
};

export const ColorBlockButton = args => {
  // Change `isConfigured` property in storybook controls
  const { isConfigured, ...props } = args;

  return (
    <Box>
      <Button mb="sm" {...props} variant="colorBlock" className={isConfigured ? 'is-configured' : ''}>
        <Box>
          <Text variant="buttonTitle">Title</Text>
          <Text variant="buttonSubtitle">Info</Text>
        </Box>
        <Icon icon={CreateIcon} title={{ name: 'Create Icon' }} />
      </Button>
      <Button {...props} variant="colorBlockPrimary" className={isConfigured ? 'is-configured' : ''}>
        <Box>
          <Text variant="buttonTitle">Title</Text>
          <Text variant="buttonSubtitle">Info</Text>
        </Box>
        <Icon icon={CreateIcon} title={{ name: 'Create Icon' }} />
      </Button>
    </Box>
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

ColorBlockButton.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.colorBlockButton,
  },
};

export const Filter = () => (
  <Button variant="filter">
    Filter Text
  </Button>
);
