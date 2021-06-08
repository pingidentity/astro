import React from 'react';
import PageHeader from '../PageHeader/PageHeader';
import Button from '../Button/Button';

export default {
  title: 'PageHeader',
  component: PageHeader,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      defaultValue: 'Forms',
    },
  },
};

export const Default = ({ ...args }) => (
  <PageHeader {...args}>
    <Button>Add a Form</Button>
  </PageHeader>
);
