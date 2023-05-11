import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Callout,
  Link,
  Text,
} from '../../index';
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
};

// main
export const Default = args => (
  <Callout {...args}>
    <Text>
      You should be aware of this. It might be good or bad, I don’t know. You
      may already be aware of it, but I want to be sure
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.DEFAULT}-callout`}
        variant="app"
      >
        {' '}
        Read More
      </Link>
    </Text>
  </Callout>
);

export const ErrorStatus = () => (
  <Callout status={statuses.ERROR}>
    <Text>
      You’ve got problems. Allow me to tell you about them in some detail so
      that you can address them
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.ERROR}-callout`}
        variant="app"
      >
        {' '}
        Read More
      </Link>
    </Text>
  </Callout>
);

// Avoiding using Error as the function name due to it being a JS built-in method
ErrorStatus.storyName = 'Error';

export const Success = () => (
  <Callout status={statuses.SUCCESS}>
    <Text>
      It Worked! Maybe there is something else related to it working that I need
      to explain
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.SUCCESS}-callout`}
        variant="app"
      >
        {' '}
        Read More
      </Link>
    </Text>
  </Callout>
);

export const Warning = () => (
  <Callout status={statuses.WARNING}>
    <Text>
      You’ve got issues. Allow me to tell you about them in some detail so that
      you can address them. I’ll continue to type enough text to demonstrate
      that the Callout box will grow in height with the content
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.WARNING}-callout`}
        variant="app"
      >
        {' '}
        Read More
      </Link>
    </Text>
  </Callout>
);
