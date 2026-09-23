import React, {
  forwardRef,
  Key,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { AriaComboBoxOptions, AriaListBoxOptions, ComboBoxAria } from 'react-aria';
import { DismissButton, FocusScope, useComboBox, useOverlayPosition } from 'react-aria';
import type { ComboBoxStateOptions } from 'react-stately';
import { useComboBoxState } from 'react-stately';
import { useFilter } from '@react-aria/i18n';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import type { Placement } from '@react-types/overlays';

import { usePropWarning } from '../../hooks';
import { ComboBoxFieldProps } from '../../types';
import type { ScrollBoxProps } from '../../types/scrollBox';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import ComboBoxInput from '../ComboBox';
import ListBox from '../ListBox';
import Popover from '../Popover';
import ScrollBox from '../ScrollBox';

const displayName = 'ComboBoxField';

interface ComboBoxFieldFC {
  <T extends object>(
    props: ComboBoxFieldProps<T> & React.RefAttributes<HTMLInputElement>,
  ): React.ReactElement | null;
  displayName?: string;
  defaultProps?: Partial<ComboBoxFieldProps> | undefined;
}

const ComboBoxField = forwardRef(<T extends object>(
  props: ComboBoxFieldProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const {
    hasAutoFocus,
    hasAddOption,
    hasCustomValue,
    hasNoEmptySelection,
    selectedKey,
    onSelectionChange,
    defaultItems: initialDefaultItems,
    items: initialItems,
    loadingState,
    onLoadMore,
    inputValue,
    isReadOnly,
    menuTrigger,
    isNotFlippable,
    direction,
    scrollBoxProps,
    controlProps,
    defaultFilter,
    status,
    helperText,
    renderEmptyState,
    allowsEmptyCollection,
    ...others
  } = props;
  const { nonAriaProps } = getAriaAttributeProps(others);
  const comboBoxOptions = {
    autoFocus: hasAutoFocus,
    allowsCustomValue: hasAddOption || hasCustomValue,
    disallowEmptySelection: hasNoEmptySelection,
    selectedKey,
    onSelectionChange,
    loadingState,
    onLoadMore,
    inputValue,
    menuTrigger,
    shouldFlip: !isNotFlippable,
    direction,
    label: 'default',
    allowsEmptyCollection,
    ...nonAriaProps,
  };

  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const shouldShowAddOption = hasAddOption && inputValue && selectedKey !== inputValue;
  const addOption = `ADD: ${inputValue}`;

  const getItemsArr = (initialArr: Iterable<T> | undefined) => {
    if (initialArr && shouldShowAddOption) {
      return [...Array.from(initialArr), { name: addOption, key: addOption }];
    }
    return initialArr;
  };

  const defaultItems = getItemsArr(initialDefaultItems);
  const items = getItemsArr(initialItems);

  /* istanbul ignore next */
  const onSelectionChangeHandler = (key: Key | null) => {
    let newVal = key || selectedKey || '';
    const arrayOfValues = Array.from((items || defaultItems) as Iterable<T>);

    if (hasAddOption && selectedKey !== inputValue
      && (arrayOfValues[arrayOfValues.length - 1] as { key?: Key }).key === key) {
      newVal = inputValue as unknown as Key;
    }
    if (onSelectionChange) onSelectionChange(newVal);
  };

  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({
    ...comboBoxOptions,
    defaultItems: isReadOnly ? [] : defaultItems,
    items,
    onSelectionChange: (hasAddOption || hasCustomValue)
      ? onSelectionChangeHandler
      : onSelectionChange,
    defaultFilter: (typeof defaultFilter !== 'undefined' ? defaultFilter : contains),
  } as ComboBoxStateOptions<object>);

  useEffect(() => {
    if (shouldShowAddOption) state.selectionManager.setFocusedKey(addOption);
  }, [shouldShowAddOption, inputValue, addOption, state.isOpen]);

  const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...comboBoxOptions,
      buttonRef,
      popoverRef,
      listBoxRef,
      inputRef,
    } as AriaComboBoxOptions<object>,
    state,
  );
  const {
    shouldFocusOnHover,
    shouldSelectOnPressUp,
    'UNSTABLE_itemBehavior': action,
    ...otherListBoxProps
  } = listBoxProps as typeof listBoxProps & {
  shouldFocusOnHover?: boolean;
  shouldSelectOnPressUp?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'UNSTABLE_itemBehavior'?: any;
  };

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    offset: 1,
    targetRef: inputWrapperRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} end` as Placement,
    shouldFlip: !isNotFlippable,
    isOpen: state.isOpen,
    onClose: state.close,
  });

  // Update position once the ListBox has rendered. This ensures that
  // it flips properly when it doesn't fit in the available space.
  /* istanbul ignore next */
  useLayoutEffect(() => {
    if (state.isOpen) {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [state.isOpen, updatePosition]);


  // Measure the width of the input to inform the width of the menu (below).
  const [menuWidth, setMenuWidth] = useState<number | null>(null);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (inputWrapperRef.current) {
      setMenuWidth(inputWrapperRef.current.offsetWidth);
    }
  }, [inputWrapperRef, setMenuWidth]);

  useResizeObserver({
    ref: inputWrapperRef,
    onResize,
  });

  // Re-measure synchronously (before paint) whenever the menu opens or closes,
  // so the Popover renders with the correct width on the first frame.
  // Without state.isOpen in deps, width updates rely solely on ResizeObserver
  // which fires asynchronously after paint, causing a visible flicker.
  useLayoutEffect(onResize, [onResize, state.isOpen]);

  const style = {
    ...overlayProps.style,
    width: menuWidth,
    minWidth: menuWidth,
  } as React.CSSProperties;

  const listBox = !isReadOnly && (
    <Popover
      hasNoArrow
      isNonModal
      style={style}
      state={state}
      triggerRef={inputRef}
      popoverRef={popoverRef}
      offset={5}
    >
      <FocusScope>
        <DismissButton onDismiss={state.close} />
        <ScrollBox {...(scrollBoxProps as ScrollBoxProps)}>
          <ListBox
            ref={listBoxRef}
            hasNoEmptySelection
            hasAutoFocus={(state.focusStrategy || true) as boolean}
            state={state}
            hasVirtualFocus
            isLoading={loadingState === loadingStates.LOADING_MORE}
            onLoadMore={onLoadMore}
            isFocusedOnHover={shouldFocusOnHover}
            isSelectedOnPressUp={shouldSelectOnPressUp}
            renderEmptyState={renderEmptyState}
            {...otherListBoxProps}
          />
        </ScrollBox>
        <DismissButton onDismiss={state.close} />
      </FocusScope>
    </Popover>
  );

  return (
    <>
      <ComboBoxInput
        {...getPendoID(displayName)}
        {...props}
        isOpen={state.isOpen}
        inputProps={inputProps}
        labelProps={labelProps}
        inputWrapperRef={inputWrapperRef}
        inputRef={inputRef}
        triggerProps={buttonProps}
        triggerRef={buttonRef}
        controlProps={controlProps}
        aria-invalid={status === 'error' && true}
      />
      {listBox}
    </>
  );
}) as unknown as ComboBoxFieldFC;

ComboBoxField.defaultProps = {
  menuTrigger: 'focus',
  direction: 'bottom',
  scrollBoxProps: { maxHeight: '300px' },
  defaultItems: [],
};

ComboBoxField.displayName = displayName;
export default ComboBoxField;
