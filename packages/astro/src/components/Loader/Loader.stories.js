import React from 'react';
import Loader from './';

export default {
  title: 'Loader',
  component: Loader,

};

export const Default = args => (
  <Loader {...args} />
);

export const LoaderWithMostCommonColor = () => (
  <Loader color="neutral.60" />
);
