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

export const Primary = () => (
  <Button variant="primary">
    Button Text
  </Button>
);

Primary.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.primary,
  },
};

export const Critical = () => (
  <Button variant="critical">
    Button Text
  </Button>
);

Critical.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.button.critical,
  },
};

export const InlineButton = () => (
  <Box>
    <Button mb="sm" mr="auto" variant="inline">
      Button Text
    </Button>
    <Button mb="sm" mr="auto" variant="inlinePrimary">
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

export const TextIconButton = () => (
  <Box width={20}>
    <Button mb="sm" variant="withIcon">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="accent.30"
        size={20}
        title={{ name: 'Add Circle Icon' }}
      />
      Button Text
    </Button>
    <Button mb="sm" variant="primaryWithIcon">
      <Icon
        mr="xs"
        icon={PlusIcon}
        color="white"
        size={20}
        title={{ name: 'Add Circle Icon' }}
      />
      Button Text
    </Button>
    <Button mb="sm" mr="auto" variant="inlineWithIcon">
      <Icon
        icon={PlusIcon}
        mr="xs"
        color="accent.30"
        size={15}
        title={{ name: 'Add Circle Icon' }}
      />
      Button Text
    </Button>
    <Button mb="sm" mr="auto" variant="inlinePrimaryWithIcon">
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

export const Disabled = () => (
  <Button isDisabled>
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
