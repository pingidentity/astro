import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Callout,
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
  decorators: [withDesign],
  argTypes: {
    ...statusArgTypes,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <CalloutReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

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

export const ErrorStatus: StoryFn = () => (
  <Callout status={statuses.ERROR}>
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

export const Success: StoryFn = () => (
  <Callout status={statuses.SUCCESS}>
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
        aria-label={`${statuses.DEFAULT}-callout`}
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
};
export const Warning: StoryFn = () => (
  <Callout status={statuses.WARNING}>
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
