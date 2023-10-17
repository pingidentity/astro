import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Link, PageHeader } from '../../index';

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

const description = `The description of the page. The description of the page. The description of the page. The
    description of the page.The description of the page. The description of the page. The
    description of the page. The description of the page. The description of the page. `;

export const Default = args => (
  <PageHeader
    buttonProps={{ onPress: () => {} }}
    title="Title of the Page"
    {...args}
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);

export const WithoutButton = () => (
  <PageHeader
    title="Title of the Page"
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);

export const WithoutLink = () => (
  <PageHeader
    buttonProps={{ onPress: () => {} }}
    title="Title of the Page"
  >
    {description}
  </PageHeader>
);

export const WithButtonProps = () => (
  <PageHeader
    buttonProps={{ bg: 'critical.bright' }}
    title="Title of the Page"
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);
