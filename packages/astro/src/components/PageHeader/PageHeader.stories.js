import React from 'react';
import PageHeader from '../PageHeader/PageHeader';
import Button from '../Button/Button';

export default {
  title: 'PageHeader',
  component: PageHeader,
};

export const Default = () => (
  <PageHeader title="Forms">
    <Button>Add a Form</Button>
  </PageHeader>
);
