import React from 'react';
import Label from '.';

export default {
  title: 'Form/Base Components/Label',
  component: Label,
};

export const Default = () => (
  <Label>This is a label</Label>
);

export const Float = () => (
  <Label mode="float">This is a float label</Label>
);
