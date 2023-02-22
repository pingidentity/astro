import React from 'react';

import { RockerButton, RockerButtonGroup } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only RockerButtonGroup',
  component: RockerButtonGroup,
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <RockerButtonGroup>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);
