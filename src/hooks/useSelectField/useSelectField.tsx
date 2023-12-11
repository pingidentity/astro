import React, { DOMAttributes, Key, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { AriaButtonProps, DismissButton, FocusScope, useOverlayPosition, useSelect } from 'react-aria';
import { SelectState, useSelectState } from 'react-stately';
import { useResizeObserver } from '@react-aria/utils';
// eslint-disable-next-line import/no-unresolved
import { CollectionChildren } from '@react-types/shared';
import { LabelProps as ThemeUILabelProps } from 'theme-ui';

import { modes } from '../../components/Label/constants';
import ListBox from '../../components/ListBox/ListBox';
import PopoverContainer from '../../components/PopoverContainer';
import ScrollBox from '../../components/ScrollBox';
import { Axis, BoxProps, FocusableElement, Placement, PlacementAxis, ReactRef, StyleProps } from '../../types';
import { LabelMode } from '../useColumnStyles/useColumnStyles';
import { FieldControlInputProps } from '../useField/useField';
import { useColumnStyles, useDeprecationWarning, useField } from '..';

interface UseSelectFieldProps<T> {
  children: CollectionChildren<T>
  align?: PlacementAxis;
  defaultSelectedKey?: string;
  defaultText?: string;
  direction?: Axis;
  disabledKeys?: Iterable<Key>;
  hasNoEmptySelection?: boolean;
  isDefaultOpen?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isNotFlippable?: boolean;
  isOpen?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  items?: Iterable<T>;
  label?: string;
  listboxStyle?: React.CSSProperties;
  name?: string;
  placeholder?: string;
  selectedKey?: string;
  onLoadMore?: () => unknown;
  onOpenChange?: (isOpen: boolean) => unknown;
  onSelectionChange?: (key: Key) => unknown;
  controlProps?: React.HTMLAttributes<Element>;
  scrollBoxProps?: BoxProps;
  listBoxProps?: BoxProps;
  labelProps?: ThemeUILabelProps;
  containerProps?: BoxProps;
  labelMode: LabelMode;
}

interface UseSelectFieldReturnProps {
  columnStyleProps: StyleProps,
  fieldContainerProps: BoxProps,
  fieldControlInputProps: FieldControlInputProps,
  fieldControlWrapperProps: BoxProps,
  fieldLabelProps: ThemeUILabelProps,
  isLoadingInitial?: boolean,
  listBoxRef: ReactRef,
  overlay: React.ReactNode;
  popoverRef: ReactRef,
  state: SelectState<object>,
  triggerProps: AriaButtonProps<'button'>,
  triggerRef: ReactRef,
  valueProps: DOMAttributes<FocusableElement>,
}

const useSelectField = <T extends object, >(
  props: UseSelectFieldProps<T>,
  ref: ReactRef,
): UseSelectFieldReturnProps => {
  const {
    align,
    children,
    defaultSelectedKey,
    defaultText,
    direction,
    disabledKeys,
    hasNoEmptySelection: disallowEmptySelection,
    isDefaultOpen: defaultOpen,
    isDisabled,
    isLoading,
    isNotFlippable,
    isOpen,
    isReadOnly,
    isRequired,
    items,
    label,
    listboxStyle,
    name,
    placeholder,
    selectedKey,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    controlProps,
    scrollBoxProps,
    listBoxProps,
  } = props;
  // We use falsy booleans as defaults, but React Aria has this as true by default so we need to
  // negate this.
  const shouldFlip = !isNotFlippable;
  const selectProps = {
    defaultSelectedKey,
    defaultText,
    disabledKeys,
    isDisabled,
    isLoading,
    isOpen,
    isReadOnly,
    isRequired,
    items,
    label,
    name,
    placeholder,
    selectedKey,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    defaultOpen, // must match React Aria API
    disallowEmptySelection, // must match React Aria API
    shouldFlip, // must match React Aria API
    ...controlProps,
    children,
  };
  // Create state based on the incoming props
  const state = useSelectState(selectProps);

  const popoverRef = useRef() as React.RefObject<HTMLElement>;
  const listBoxRef = useRef() as React.RefObject<HTMLElement>;
  const triggerRef = useRef() as React.RefObject<HTMLElement>;
  /* istanbul ignore next */
  useImperativeHandle(ref, () => triggerRef.current as HTMLElement);

  useDeprecationWarning(
    'The "defaultText" prop for `SelectField` will be deprecated in Astro-UI 1.0.0, use the "placeholder" prop instead.',
    { isActive: !!defaultText },
  );

  // Get props for child elements from useSelect
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    selectProps,
    state,
    triggerRef,
  );

  // The following props are being passed into multiple
  // DOM elements that leads to multiple test failures
  // and these props are never used in any components
  // that depend on useSelectField
  delete menuProps.shouldSelectOnPressUp;
  delete menuProps.shouldFocusOnHover;
  delete menuProps.disallowEmptySelection;

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    ...props,
    placeholder: props.labelMode === modes.FLOAT ? '' : placeholder,
    labelProps: {
      ...props.labelProps,
      ...labelProps,
    },
    containerProps: {
      isFloatLabelActive: !!state.selectedItem,
      ...props.containerProps,
    },
  });

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    targetRef: triggerRef as React.RefObject<Element>,
    overlayRef: popoverRef as React.RefObject<Element>,
    scrollRef: listBoxRef as React.RefObject<Element>,
    placement: `${direction} ${align}` as Placement,
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

  // Measure the width of the input to inform the width of the listbox (below).
  const [buttonWidth, setButtonWidth] = useState(0);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (triggerRef.current) {
      setButtonWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef, setButtonWidth]);

  useResizeObserver({
    ref: triggerRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  const style = {
    ...overlayProps.style,
    width: buttonWidth,
    minWidth: buttonWidth,
    ...listboxStyle,
  };

  const columnStyleProps = useColumnStyles({ labelMode: props.labelMode });
  const isLoadingInitial = props.isLoading && state.collection.size === 0;
  const isLoadingMore = props.isLoading && state.collection.size > 0;

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the popup is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  const listbox = (
    <FocusScope restoreFocus>
      <DismissButton onDismiss={() => state.close()} />
      <ListBox
        ref={listBoxRef}
        hasNoEmptySelection
        hasAutoFocus={state.focusStrategy || true}
        state={state}
        variant="listBox.selectField"
        isLoading={isLoadingMore}
        onLoadMore={onLoadMore}
        {...menuProps}
        {...listBoxProps}
      />
      <DismissButton onDismiss={() => state.close()} />
    </FocusScope>
  );

  const overlay = (
    <PopoverContainer
      hasNoArrow
      isDismissable
      isNonModal
      isOpen={state.isOpen}
      onClose={state.close}
      placement={placement}
      ref={popoverRef}
      style={style}
    >
      <ScrollBox {...scrollBoxProps}>
        {listbox}
      </ScrollBox>
    </PopoverContainer>
  );

  return {
    columnStyleProps,
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
    isLoadingInitial,
    listBoxRef,
    overlay,
    popoverRef,
    state,
    triggerProps,
    triggerRef,
    valueProps,
  };
};

export default useSelectField;
