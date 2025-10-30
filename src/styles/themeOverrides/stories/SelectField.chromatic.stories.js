import React from 'react';
import { OverlayProvider } from 'react-aria';

import { Item, SelectField } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only SelectField',
  component: SelectField,
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <OverlayProvider>
    <SelectField width="100%">
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </SelectField>
  </OverlayProvider>
);
