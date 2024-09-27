import React, { forwardRef } from 'react';
import type { AriaSearchFieldProps, SearchFieldAria } from 'react-aria';
import { useSearchField } from 'react-aria';
import type { SearchFieldProps as UseSearchFieldProps, SearchFieldState } from 'react-stately';
import { useSearchFieldState } from 'react-stately';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import SearchIcon from '@pingux/mdi-react/SearchIcon';

import { Box, Icon, IconButton, Input, Label } from '../..';
import { useField, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { FieldControlInputProps, UseFieldProps } from '../../hooks/useField/useField';
import { SearchFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

const displayName = 'SearchField';

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>((props, ref) => {
  const {
    autocomplete,
    hasAutoFocus,
    hasNoClearButton,
    icon,
    isExcludedFromTabOrder,
    label,
    controlProps,
    iconProps,
    labelProps,
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');
  const searchRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  const state:SearchFieldState = useSearchFieldState(props as UseSearchFieldProps);

  const {
    labelProps: raLabelProps,
    inputProps: raInputProps,
    clearButtonProps,
  }:SearchFieldAria = useSearchField({
    autoComplete: autocomplete,
    autoFocus: hasAutoFocus,
    excludeFromTabOrder: isExcludedFromTabOrder,
    ...props,
  } as AriaSearchFieldProps, state, searchRef);

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    ...props,
    labelProps: {
      ...labelProps,
      ...raLabelProps,
    },
    controlProps: {
      ...controlProps,
      ...raInputProps,
    },
  }as UseFieldProps<SearchFieldProps>);

  const handleKeyDownEvent = e => {
    const key = e.key;
    if (key === 'Enter' || key === ' ') {
      state.setValue('');
    }
  };

  return (
    <Box {...getPendoID(displayName)} {...fieldContainerProps}>
      {label && <Label {...fieldLabelProps} />}
      <Box variant="forms.search.wrapper" {...fieldControlWrapperProps}>
        <Input
          variant="forms.input.search"
          ref={searchRef}
          pl="xl"
          pr="xl"
          {...fieldControlInputProps as Omit<FieldControlInputProps, 'onChange'>}
        />
        {
          icon
          && (
            <Icon
              icon={icon}
              variant="forms.search.icon"
              size={20}
              title={{ name: 'Search Icon' }}
              {...iconProps}
            />
          )
        }
        {
          !hasNoClearButton
          && state.value !== ''
          && (
            <IconButton
              tabIndex={0}
              onKeyDown={handleKeyDownEvent}
              sx={{
                position: 'absolute',
                top: 8,
                right: 10,
                path: {
                  fill: 'text.secondary',
                },
              }}
              {...clearButtonProps}
            >
              <Icon icon={CloseIcon} title={{ name: 'Close Icon' }} />
            </IconButton>
          )
        }
      </Box>
    </Box>
  );
});

SearchField.defaultProps = {
  hasNoClearButton: false,
  icon: SearchIcon,
};

SearchField.displayName = displayName;

export default SearchField;
