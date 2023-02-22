import React from 'react';

import withDeprecationWarning from '../../utils/devUtils/decorators/withDeprecationWarning';
import Button from '../Button/Button';

import PageHeader from './PageHeader';

export default {
  title: 'Deprecated/PageHeader',
  component: PageHeader,
  decorators: [
    (Story, context) => withDeprecationWarning(Story, context, 'The `PageHeader` component will be deprecated in Astro-UI 2.0.0.'),
  ],
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
