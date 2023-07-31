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
      defaultValue: 'Title of the Page',
    },
  },
};

const description = `The description of the page. The description of the page. The description of the page. The
    description of the page.The description of the page. The description of the page. The
    description of the page. The description of the page. The description of the page. `;

export const Default = args => (
  <PageHeader {...args}>
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);

export const WithoutLink = args => <PageHeader {...args}>{description}</PageHeader>;

export const WithButtonProps = args => (
  <PageHeader
    {...args}
    buttonProps={{ bg: 'mistyrose' }}
  >
    {description}
    <Link href="https://uilibrary.ping-eng.com/">Learn more</Link>
  </PageHeader>
);
