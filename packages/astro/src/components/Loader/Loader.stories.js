import React from 'react';

import { Loader } from '../../index';
import { flatColorList } from '../../styles/colors';

export default {
  title: 'Components/Loader',
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
      description: 'The size of the loader. Sizes can either be a string such as xs, sm, md, etc or numeric size with unit such as 15px. Default size inherits the font size. '
          + 'Numeric value paired with a unit. https://www.w3schools.com/cssref/css_units.asp',
    },
  },
};

export const Default = args => (
  <Loader {...args} />
);

export const CustomColor = () => (
  <Loader color="neutral.60" />
);
