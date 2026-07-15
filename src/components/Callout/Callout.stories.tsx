import React from 'react';
import CheckBoldIcon from '@pingux/mdi-react/CheckBoldIcon';
import LightbulbOutlineIcon from '@pingux/mdi-react/LightbulbOutlineIcon';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Callout,
  Icon,
  Link,
  Text,
} from '../../index';
import { CalloutProps } from '../../types/callout';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import statuses from '../../utils/devUtils/constants/statuses';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import CalloutReadme from './Callout.mdx';

export default {
  title: 'Components/Callout',
  component: Callout,
  argTypes: {
    ...statusArgTypes,
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <CalloutReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} satisfies Meta<typeof Callout>;

// main
export const Default: StoryFn<CalloutProps> = args => (
  <Callout {...args}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque vitae lacinia diam, nec ullamcorper neque.
      In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
    </Text>
  </Callout>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.callout.default,
  },
};

export const Customizations = () => (
  <Callout
    icon={(
      <Icon
        icon={LightbulbOutlineIcon}
        size="sm"
        color="teal-500"
        mr="md"
      />
    )}
    sx={{
      borderLeftColor: 'teal-500',
    }}
  >
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque vitae lacinia diam, nec ullamcorper neque.
      In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
    </Text>
  </Callout>
);

export const ErrorStatus: StoryFn = args => (
  <Callout status={statuses.ERROR} {...args}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque vitae lacinia diam, nec ullamcorper neque.
      In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
      Etiam at urna erat.
    </Text>
  </Callout>
);

ErrorStatus.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.callout.errorStatus,
  },
};

// Avoiding using Error as the function name due to it being a JS built-in method
ErrorStatus.storyName = 'Error';

export const Success: StoryFn = args => (
  <Callout status={statuses.SUCCESS} {...args}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque vitae lacinia diam, nec ullamcorper neque.
      In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
    </Text>
  </Callout>
);

Success.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.callout.success,
  },
};

export const WithLink = args => (
  <Callout {...args}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque vitae lacinia diam, nec ullamcorper neque.
      In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
      {' '}
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.SUCCESS}-callout read more`}
        variant="app"
      >
        Learn More
      </Link>
    </Text>
  </Callout>
);

WithLink.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.callout.withLink,
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }, { id: 'link-in-text-block', enabled: false }],
    },
  },
};
export const Warning: StoryFn = args => (
  <Callout status={statuses.WARNING} {...args}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque vitae lacinia diam, nec ullamcorper neque.
      In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
    </Text>
  </Callout>
);

Warning.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.callout.warning,
  },
};

const iconContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 25,
  height: 25,
  minWidth: 25,
  minHeight: 25,
  borderStyle: 'solid',
  borderRadius: '50%',
  backgroundColor: 'active',
  borderColor: 'active',
  color: 'text.primaryLight',
  mx: 'md',
};

export const WithCustomIcon: StoryFn = () => (
  <Callout
    icon={(
      <Box
        sx={iconContainer}
      >
        <Icon
          icon={CheckBoldIcon}
          title={{ name: 'Check Circle Outline Icon' }}
        />
      </Box>
    )}
  >
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Quisque vitae lacinia diam, nec ullamcorper neque.
      In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
    </Text>
  </Callout>
);
