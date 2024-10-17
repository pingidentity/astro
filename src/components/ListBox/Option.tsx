import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import CircleSmallIcon from '@pingux/mdi-react/CircleSmallIcon';
import { useOption } from '@react-aria/listbox';

import { useMultivaluesContext } from '../../context/MultivaluesContext';
import { useStatusClasses } from '../../hooks';
import { AriaListBoxOptionsType, ListBoxStateType, OptionType } from '../../types';
import Box from '../Box';
import Icon from '../Icon';

import { ListBoxContext } from './ListBoxContext';

const UncheckedIcon = prop => (

  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="variable-icon-title" {...prop}>
    <title id="variable-icon-title">Unchecked Icon</title>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);


const CheckedIcon = prop => (

  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="variable-icon-title" {...prop}>
    <title id="variable-icon-title">Checked Icon</title>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>

);

const Option = forwardRef((props: OptionType, ref) => {
  const { item, hasVirtualFocus, isCondensed, ...others } = props;

  const { key, props: itemProps, rendered, 'aria-label': ariaLabel } = item;

  const state = useContext(ListBoxContext) as ListBoxStateType;
  const { isSeparator, 'data-id': dataId } = itemProps;
  // Get props for the option element
  const optionRef = useRef(null);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => optionRef.current);
  const { optionProps, isDisabled, isSelected, isFocused, isFocusVisible, isPressed } = useOption(
    {
      key,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: !isCondensed,
      shouldUseVirtualFocus: isCondensed ? false : hasVirtualFocus,
      isVirtualized: true,
      ...others,
    },
    state,
    optionRef,
  );

  const focused = isFocused || state?.selectionManager?.focusedKey === item.key;

  const setFocusOnHover = () => {
    if (!focused && !isCondensed) {
      state.selectionManager.setFocusedKey(item.key);
    }
  };

  const { classNames } = useStatusClasses(null, {
    isDisabled: isDisabled || isSeparator,
    isFocused: focused,
    isSelected,
    isCondensed,
    isFocusVisible,
    isPressed,
  });

  const updateActiveDescendant = useMultivaluesContext();

  useEffect(() => {
    if (isFocused && updateActiveDescendant) {
      updateActiveDescendant(optionProps.id);
    }
  }, [isFocused, updateActiveDescendant]);

  // /* Related to UIP-4992
  //  * Need to remove these properties to avoid errors in the console on the external app.
  //  * By the way, these properties return "undefined", so it shouldn't create issues */
  const { onPressStart, onPressUp, ...theseOptionProps } = (optionProps as AriaListBoxOptionsType);

  return (
    <Box
      as="li"
      isRow
      ref={optionRef}
      variant="listBox.option"
      data-id={dataId}
      className={classNames}
      onPointerOver={setFocusOnHover}
      {...theseOptionProps}
      {...others}
      aria-label={ariaLabel}
    >
      { (isCondensed ? (
        <Icon
          icon={isSelected ? CheckedIcon : UncheckedIcon}
          color="active"
          size="24px"
          mr="xs"
          className={classNames}
          variant="listBox.checkboxIcon"
        />
      ) : (isSelected && <Icon icon={CircleSmallIcon} title={{ name: 'Circle Small Icon' }} />)) }
      { rendered}
    </Box>
  );
});

export default Option;
