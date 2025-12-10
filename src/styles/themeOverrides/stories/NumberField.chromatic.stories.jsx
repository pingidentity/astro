import React from 'react';

import { NumberField } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only NumberField',
  component: NumberField,
  decorators: [WithUiLibraryCss],
};

export const Default = () => <NumberField />;
