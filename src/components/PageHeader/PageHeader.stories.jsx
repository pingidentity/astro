import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Link, PageHeader } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import PageHeaderReadMe from './PageHeader.mdx';

export default {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      page: () => (
        <>
          <PageHeaderReadMe />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
  },
};

const description = `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts 
and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
for previewing layouts and visual mockups. `;

export const Default = args => (
  <PageHeader
    buttonProps={{ onPress: () => { } }}
    title="Lorem Ipsum"
    {...args}
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.pageHeader.default,
  },
  a11y: {
    config: {
      rules: [{ id: 'link-in-text-block', enabled: false }],
    },
  },
};

export const WithoutButton = args => (
  <PageHeader
    title="Lorem Ipsum"
    {...args}
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);

WithoutButton.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.pageHeader.withoutButton,
  },
  a11y: {
    config: {
      rules: [{ id: 'link-in-text-block', enabled: false }],
    },
  },
};

export const WithoutLink = args => (
  <PageHeader
    buttonProps={{ onPress: () => { } }}
    title="Lorem Ipsum"
    {...args}
  >
    {description}
  </PageHeader>
);

WithoutLink.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.pageHeader.withoutLink,
  },
};

export const Customization = args => (
  <PageHeader
    buttonProps={{ bg: 'critical.bright' }}
    title="Lorem Ipsum"
    {...args}
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);

Customization.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.pageHeader.withoutButton,
  },
  a11y: {
    config: {
      rules: [{ id: 'link-in-text-block', enabled: false }],
    },
  },
};
