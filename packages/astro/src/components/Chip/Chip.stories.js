import React from 'react';
import { Clear } from '@pingux/icons';
import Chip from '../Chip/Chip';
import Icon from '../Icon/Icon';

export default {
  title: 'Chip',
  component: Chip,
};

export const Default = () => (
  <Chip label="Label" color="white" />
);

export const ChipWithCustomColors = () => (
  <Chip label="Custom Colors" bg="green" textColor="#ffffff" />
);

export const ChipWithIcon = () => (
  <Chip label="Chip with Icon" bg="navy">
    <Icon icon={Clear} ml="xs" size="10px" color="white" />
  </Chip>
);
