import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
import IconButton from '.';
import Icon from '../Icon';

export default {
  title: 'Icon Button',
  component: IconButton,
};

export const Default = () => (
  <IconButton aria-label="my-label" >
    <Icon icon={CreateIcon} />
  </IconButton>
);
export const Inverted = () => (
  <IconButton aria-label="my-label" variant="inverted" >
    <Icon icon={CreateIcon} />
  </IconButton>
);

export const WithTooltip = () => (
  <IconButton aria-label="my-label" title="Edit">
    <Icon icon={CreateIcon} />
  </IconButton>
);
