import React from 'react';
import Loader from './';
import { flatColorList } from '../../styles/colors';

export default {
  title: 'Loader',
  component: Loader,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
      defaultValue: 'active',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the loader. Default size inherits the font size.' +
          'Numeric value paired with a unit. https://www.w3schools.com/cssref/css_units.asp',
    },
  },
};

export const Default = args => (
  <Loader {...args} />
);

export const LoaderWithMostCommonColor = () => (
  <Loader color="neutral.60" />
);
