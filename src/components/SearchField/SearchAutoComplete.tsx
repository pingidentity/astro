import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { AriaComboBoxOptions,
  AriaListBoxOptions,
  AriaSearchFieldProps,
  SearchFieldAria } from 'react-aria';
import { DismissButton, FocusScope, useComboBox, useFilter, useSearchField } from 'react-aria';
import type { ComboBoxStateOptions, SearchFieldState } from 'react-stately';
import { useComboBoxState, useSearchFieldState } from 'react-stately';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import { mergeProps, useResizeObserver } from '@react-aria/utils';

import { Box, Icon, IconButton, Input, Label, ScrollBox } from '../..';
import { useField, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { UseFieldProps } from '../../hooks/useField/useField';
import { SearchFieldProps, SearchItem } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import ListBox from '../ListBox/ListBox';
import Popover from '../Popover/Popover';

const displayName = 'SearchField';

export const SearchAutoComplete = forwardRef<
  HTMLInputElement,
  SearchFieldProps<SearchItem>
>((props, ref) => {
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
    value,
    onChange,
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');

  const { contains } = useFilter({ sensitivity: 'base' });

  const comboBoxState = useComboBoxState({
    ...props,
    inputValue: value,
    defaultInputValue: props.defaultValue,
    onInputChange: onChange,
    defaultFilter: contains,
    allowsCustomValue: true,
  } as ComboBoxStateOptions<object>);

  const inputRef = useLocalOrForwardRef<HTMLInputElement>(ref);
  const outerRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);
  const clearButtonRef = useRef(null);

  const {
    inputProps,
    listBoxProps,
    labelProps: rsLabelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef,
    } as AriaComboBoxOptions<object>,
    comboBoxState,
  );
  delete inputProps['data-testid'];

  const { shouldFocusOnHover, shouldSelectOnPressUp, 'UNSTABLE_itemBehavior': action, ...otherListBoxProps } = listBoxProps as typeof listBoxProps & {
  shouldFocusOnHover?: boolean;
  shouldSelectOnPressUp?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'UNSTABLE_itemBehavior'?: any;
  };

  const searchProps = {
    label: props.label,
    value: comboBoxState.inputValue,
    'aria-label': props['aria-label'],
    onChange: (v: string) => comboBoxState.setInputValue(v),
    onClear: props.onClear,
    onSubmit: props.onSubmit,
  };

  const searchState: SearchFieldState = useSearchFieldState(searchProps);

  const {
    labelProps: raLabelProps,
    inputProps: raInputProps,
    clearButtonProps,
  }: SearchFieldAria = useSearchField(
    {
      autoComplete: autocomplete,
      autoFocus: hasAutoFocus,
      excludeFromTabOrder: isExcludedFromTabOrder,
      ...searchProps,
    } as AriaSearchFieldProps,
    searchState,
    inputRef,
  );

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
      ...rsLabelProps,
    },
    controlProps: {
      ...controlProps,
      ...raInputProps,
    },
  } as UseFieldProps<SearchFieldProps<SearchItem>>);

  const handleKeyDownEvent = e => {
    const key = e.key;
    if (key === 'Enter' || key === ' ') {
      comboBoxState.setInputValue('');
    }
  };

  // Popover width matches the input width
  const [popoverWidth, setPopoverWidth] = useState(0);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (outerRef.current) {
      setPopoverWidth(outerRef.current.offsetWidth);
    }
  }, [outerRef, setPopoverWidth]);

  useResizeObserver({
    ref: outerRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  return (
    <Box {...getPendoID(displayName)} {...fieldContainerProps}>
      {label && <Label {...fieldLabelProps} />}
      <Box
        variant="forms.search.wrapper"
        ref={outerRef}
        {...fieldControlWrapperProps}
      >
        <Input
          variant="forms.input.search"
          ref={inputRef}
          {...mergeProps(fieldControlInputProps, inputProps)}
        />
        {icon && (
          <Icon
            icon={icon}
            variant="forms.search.icon"
            title={{ name: 'Search Icon' }}
            {...iconProps}
          />
        )}
        {!hasNoClearButton && searchState.value !== '' && (
          <IconButton
            ref={clearButtonRef}
            {...clearButtonProps}
            tabIndex={0}
            onKeyDown={handleKeyDownEvent}
            color="text.secondary"
            variant="searchClearButton"
          >
            <Icon icon={CloseIcon} title={{ name: 'Close Icon' }} />
          </IconButton>
        )}
      </Box>
      {comboBoxState.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={outerRef}
          state={comboBoxState}
          isNonModal
          width={popoverWidth}
        >
          <ScrollBox maxHeight={200}>
            <FocusScope restoreFocus>
              <ListBox
                ref={listBoxRef}
                state={comboBoxState}
                isFocusedOnHover={shouldFocusOnHover}
                isSelectedOnPressUp={shouldSelectOnPressUp}
                shouldShowSelectedOption={false}
                {...otherListBoxProps}
              />
            </FocusScope>
          </ScrollBox>
        </Popover>
      )}
    </Box>
  );
});
