import React from 'react';

import { Label } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only Label',
  component: Label,
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <Label>This is a label</Label>
);
