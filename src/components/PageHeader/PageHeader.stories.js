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
      source: {
        type: 'code',
      },
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
    title="Lorem ipsum"
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
};

export const WithoutButton = () => (
  <PageHeader
    title="Lorem ipsum"
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
};

export const WithoutLink = () => (
  <PageHeader
    buttonProps={{ onPress: () => { } }}
    title="Lorem ipsum"
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

export const Customization = () => (
  <PageHeader
    buttonProps={{ bg: 'critical.bright' }}
    title="Lorem ipsum"
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);
