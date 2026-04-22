import React from 'react';

import WithUiLibraryCss from '../../../styles/themeOverrides/withUiLibraryCss';

import AvatarNextGen from './AvatarNextGen';

export default {
  title: 'Chromatic Only Avatar',
  tags: ['!dev', '!autodocs'],
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <AvatarNextGen />
);
