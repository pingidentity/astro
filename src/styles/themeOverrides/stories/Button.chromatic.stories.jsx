import React from 'react';

import { Button } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only Button',
  component: Button,
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <Button>Button Text</Button>
);

export const Critical = () => (
  <Button variant="critical">Button Text</Button>
);

export const Success = () => (
  <Button variant="success">Button Text</Button>
);

export const Inline = () => (
  <Button variant="inline">Button Text</Button>
);

export const Primary = () => (
  <Button variant="primary">Button Text</Button>
);

export const Link = () => (
  <Button variant="link">Button Text</Button>
);
