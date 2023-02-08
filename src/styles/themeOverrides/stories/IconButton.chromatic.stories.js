import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';

import { Icon, IconButton } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only IconButton',
  component: IconButton,
  decorators: [WithUiLibraryCss],
};

export const Base = () => (
  <IconButton aria-label="default icon button" >
    <Icon icon={CreateIcon} />
  </IconButton>
);

export const Inverted = () => (
  <IconButton aria-label="default icon button" variant="inverted">
    <Icon icon={CreateIcon} />
  </IconButton>
);
