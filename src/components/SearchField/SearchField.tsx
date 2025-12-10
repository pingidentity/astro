import React, { forwardRef } from 'react';
import SearchIcon from '@pingux/mdi-react/SearchIcon';

import { SearchFieldProps, SearchItem } from '../../types';

import { SearchAutoComplete } from './SearchAutoComplete';
import { SearchFieldBase } from './SearchFieldBase';

const displayName = 'SearchField';

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps<SearchItem>>((props, ref) => {
  const {
    hasNoClearButton = false,
    mode = 'default',
    icon = SearchIcon,
    ...rest
  } = props;

  const Component = mode === 'autocomplete' ? SearchAutoComplete : SearchFieldBase;

  return (
    <Component
      hasNoClearButton={hasNoClearButton}
      icon={icon}
      {...rest}
      ref={ref}
    />
  );
});

SearchField.displayName = displayName;

export default SearchField;
