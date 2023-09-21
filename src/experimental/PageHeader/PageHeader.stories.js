import React from 'react';

import { Link, PageHeader } from '../..';

export default {
  title: 'Experimental/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
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
