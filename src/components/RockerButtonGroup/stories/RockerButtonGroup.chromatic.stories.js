import React from 'react';

import WithUiLibraryCss from '../../../styles/themeOverrides/withUiLibraryCss';

import RockerButtonGroupNextGen from './RockerButtonGroupNextGen';

export default {
  title: 'Chromatic Only RockerButtonGroup',
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <RockerButtonGroupNextGen />
);
