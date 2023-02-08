import React from 'react';
import SearchIcon from 'mdi-react/SearchIcon';

import { SearchField } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only SearchField',
  component: SearchField,
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <SearchField
    icon={SearchIcon}
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
  />
);
